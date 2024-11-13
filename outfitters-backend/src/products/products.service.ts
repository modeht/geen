import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Paginated } from 'src/globals/dto/paginated.dto';
import {
	Brackets,
	DataSource,
	FindManyOptions,
	FindOneOptions,
	In,
	IsNull,
	SelectQueryBuilder,
} from 'typeorm';
import { Utils } from '../../lib/utils';
import { AuthContext } from '../auth/auth.context';
import { CollectionEntity } from '../collections/entities/collection.entity';
import { PrimitiveFields } from '../globals/lib/type-helpers';
import { MediaEntity } from '../media/entities/media.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FindInventoryDto, StockStatus } from './dto/find-inventory.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductOptionValueEntity } from './entities/product-option-value.entity';
import { ProductOptionEntity } from './entities/product-option.entity';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductVariantsService } from './product-variants.service';
import { ProductReviewEntity } from './entities/product-review.entity';
import { PromotionStatusEnum } from '../promotions/entities/enums';
// TODO: Refactor this service later
@Injectable()
export class ProductsService {
	constructor(
		private dataSource: DataSource,
		private authContext: AuthContext,
		private readonly productVariantsService: ProductVariantsService,
	) {}

	private CRITICAL_STOCK_VALUE = 20;

	private noneNullableFields: Record<keyof PrimitiveFields<ProductEntity>, boolean> = {
		id: true,
		title: true,
		basePrice: true,
		currency: true,
		description: false,
		isArchived: true,
		brandId: true,
		categoryId: false,
		subCategoryId: false,
		isFeatured: true,
		deliveryEstimationInDays: true,
		sku: false,
		stock: false,
		isSaved: false,
		lastStockUpdate: false,
		isOutOfStock: false,
		averageRating: false,
	};

	// TODO: Refactor this with eager relations later
	async findAll(opts: FindManyOptions<ProductEntity>, options?, rating?) {
		const today = new Date();
		const userId = this.authContext.getUser()!.sub;
		const qb = this.dataSource.manager
			.createQueryBuilder(ProductEntity, 'product')
			.setFindOptions({
				relationLoadStrategy: 'query',
				...opts,
			})

			.leftJoin('product.ratings', 'review')
			.addSelect('COALESCE(AVG(review.stars), 0)', 'product_averageRating')
			.leftJoinAndSelect(
				'product.promotions',
				'promotion',
				'promotion.start <= :today AND promotion.end >= :today AND promotion.status = :status',
				{ today, status: PromotionStatusEnum.Active },
			)

			.leftJoinAndSelect(
				'product.savedInCollections',
				'savedInCollections',
				'savedInCollections.userId = :userId',
				{ userId },
			)

			.groupBy('product.id')
			.addGroupBy('promotion.id')
			.addGroupBy('savedInCollections.id');

		if (options) {
			qb.leftJoin('product.options', 'options2').leftJoin('options2.values', 'values2');
			qb.andWhere(
				new Brackets((qb) => {
					options.forEach((option, index) => {
						qb.orWhere(
							`options2.name = :name${index} AND values2.value IN (:...value${index})`,
							{
								[`name${index}`]: option.name,
								[`value${index}`]: option.values,
							},
						);
					});
				}),
			);

			qb.having(
				'COALESCE(AVG(review.stars), 0) >= :minRating AND COUNT(DISTINCT options2.name) = :optionCount',
				{
					minRating: rating ?? 0,
					optionCount: options.length,
				},
			);
		}

		const [products, totalCount] = await qb.getManyAndCount();
		products.forEach((product) => {
			product.isSaved = product.savedInCollections?.length > 0;
			delete product.savedInCollections;
			product.variants = product.variants?.filter((variant) => !variant.isArchived);
		});
		return { products, totalCount };
	}

	async findOne(opts: FindOneOptions<ProductEntity>, throwIfNotFound = true) {
		const userId = this.authContext.getUser()!.sub;
		const row = await this.dataSource.manager
			.createQueryBuilder(ProductEntity, 'product')
			.setFindOptions(opts)
			.leftJoinAndSelect(
				'product.promotions',
				'promotion',
				'promotion.start <= :today AND promotion.end >= :today AND promotion.status = :status',
				{ today: new Date(), status: PromotionStatusEnum.Active },
			)
			.leftJoinAndSelect(
				'product.savedInCollections',
				'savedInCollections',
				'savedInCollections.userId = :userId',
				{ userId },
			)
			.addSelect(
				(qb) =>
					qb
						.select('COALESCE(AVG(review.stars), 0)')
						.from(ProductReviewEntity, 'review')
						.where('review.productId = product.id')
						.andWhere('review.stars IS NOT NULL'),
				'product_averageRating',
			)
			.getOne();

		if (!row && throwIfNotFound) throw new NotFoundException('Record was not found');
		row.variants = row.variants?.filter((variant) => !variant.isArchived);
		row.isSaved = row.savedInCollections?.length > 0;
		delete row.savedInCollections;
		return row;
	}

	async create(createProductDto: CreateProductDto) {
		const brandId = this.authContext.getUser()!.sub;
		const newProduct = new ProductEntity();
		newProduct.brandId = brandId;
		newProduct.title = createProductDto.title;
		newProduct.description = createProductDto.description;
		newProduct.basePrice = createProductDto.basePrice;
		newProduct.currency = createProductDto.currency;
		newProduct.isFeatured = createProductDto.isFeatured;
		newProduct.deliveryEstimationInDays = createProductDto.deliveryEstimationInDays;
		newProduct.categoryId = createProductDto.categoryId;
		newProduct.subCategoryId = createProductDto.subCategoryId;
		newProduct.sku = createProductDto.sku;
		newProduct.stock = createProductDto.stock;

		if ((createProductDto.stock ?? 0) > 0) newProduct.lastStockUpdate = new Date();

		newProduct.media = createProductDto.mediaIds?.map((id) => ({
			id,
		})) as MediaEntity[];

		newProduct.collections = createProductDto.collectionsIds?.map((id) => ({
			id,
		})) as CollectionEntity[];

		const skus = [
			newProduct.sku,
			...(createProductDto.variants?.map((v) => v.sku) ?? []),
		];
		await this._skuExistsCheck(skus);

		const tr = this.dataSource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			let createdProduct = await tr.manager.save(ProductEntity, newProduct);
			newProduct.variants = createProductDto.variants?.map((variant) => {
				return {
					stock: variant.stock,
					lastStockUpdate: (variant.stock ?? 0 > 0) ? new Date() : null,
					price: variant.price,
					sku: variant.sku,
					optionValues: variant.attributes?.map(
						(attr) =>
							({
								value: attr.attributeValue,
								option: {
									name: attr.attributeName,
									productId: createdProduct.id,
								},
							}) as ProductOptionValueEntity,
					),

					media: variant.mediaIds?.map((id) => ({
						id,
					})) as MediaEntity[],
				} as ProductVariantEntity;
			});
			createdProduct = await tr.manager.save(ProductEntity, newProduct);
			await tr.commitTransaction();
			return createdProduct;
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	async remove(id: number) {
		const brandId = this.authContext.getUser()!.sub;
		const product = await this.findOne({
			where: {
				isArchived: false,
				id,
				brandId,
			},
			relations: ['variants'],
		});

		product.isArchived = true;
		product.variants?.forEach((v) => (v.isArchived = true));
		await this.dataSource.manager.save(ProductEntity, product);
		return product;
	}

	// TODO: Fix this later
	async update(id: number, updateProductDto: UpdateProductDto) {
		Utils.validateNullProperties(
			updateProductDto,
			Object.keys(this.noneNullableFields)
				.filter((key) => this.noneNullableFields[key] === true)
				.map((k) => k),
		);

		const brandId = this.authContext.getUser()!.sub;
		const product = await this.dataSource.manager.findOne(ProductEntity, {
			where: {
				isArchived: false,
				brandId,
				id,
			},
			relations: {
				media: true,
				options: true,
				variants: {
					media: true,
					optionValues: true,
				},
			},
		});
		if (!product) throw new NotFoundException('Product not found');

		product.title = updateProductDto.title ?? product.title;
		product.description = updateProductDto.description ?? product.description;
		product.basePrice = updateProductDto.basePrice ?? product.basePrice;
		product.currency = updateProductDto.currency ?? product.currency;
		product.isFeatured = updateProductDto.isFeatured ?? product.isFeatured;
		product.deliveryEstimationInDays =
			updateProductDto.deliveryEstimationInDays ?? product.deliveryEstimationInDays;
		product.categoryId = updateProductDto.categoryId ?? product.categoryId;
		product.subCategoryId = updateProductDto.subCategoryId ?? product.subCategoryId;
		if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
			await this._skuExistsCheck(updateProductDto.sku);
			product.sku = updateProductDto.sku;
		}
		if ((updateProductDto.stock ?? 0) > 0 && updateProductDto.stock !== product.stock) {
			product.stock = updateProductDto.stock;
			product.lastStockUpdate = new Date();
		}

		product.media = updateProductDto.mediaIds?.map((id) => ({ id })) as MediaEntity[];
		product.collections = updateProductDto.collectionsIds?.map((id) => ({
			id,
		})) as CollectionEntity[];
		product.variants = updateProductDto.variants?.map((variant) => {
			return {
				// id: variant.id,
				stock: variant.stock,
				price: variant.price,
				sku: variant.sku,
				optionValues: variant.attributes?.map(
					(attr) =>
						({
							value: attr.attributeValue,
							option: {
								name: attr.attributeName,
								productId: product.id,
							},
						}) as ProductOptionValueEntity,
				),
				media: variant.mediaIds?.map((id) => ({ id })) as MediaEntity[],
			} as ProductVariantEntity;
		});

		const tr = this.dataSource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			await tr.manager.delete(ProductOptionEntity, { productId: product.id });
			await tr.manager.delete(ProductVariantEntity, { mainProductId: product.id });

			const updatedProduct = await tr.manager.save(ProductEntity, product);
			await tr.commitTransaction();
			return updatedProduct;
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	async _archiveProduct(product: ProductEntity) {
		const archivedProduct = new ProductEntity();
		archivedProduct.isArchived = true;
		archivedProduct.title = product.title;
		archivedProduct.description = product.description;
		archivedProduct.basePrice = product.basePrice;
		archivedProduct.currency = product.currency;
		archivedProduct.deliveryEstimationInDays = product.deliveryEstimationInDays;
		archivedProduct.categoryId = product.categoryId;
		archivedProduct.subCategoryId = product.subCategoryId;
		archivedProduct.brandId = product.brandId;
		archivedProduct.sku = product.sku;
		archivedProduct.media = product.media?.map(
			(media) => ({ url: media.url }) as MediaEntity,
		);
		archivedProduct.variants = [];

		const archivedVariants = (product.variants ?? []).map((variant) => {
			const archivedVariant = this.productVariantsService.archiveVariant(variant);
			archivedVariant.optionValues.forEach((attr) => {
				attr.productId = archivedProduct.id;
				attr.option.product = archivedProduct;
			});

			variant.optionValues = undefined;
			return archivedVariant;
		});

		archivedProduct.variants.push(...archivedVariants);
		return archivedProduct;
	}
	// TODO: go through this later
	async getInventory(findInventoryDto: FindInventoryDto, pagination: Paginated) {
		const brandId = this.authContext.getUser()!.sub;
		const mainQuery = this.dataSource.manager
			.createQueryBuilder(ProductEntity, 'product')
			.where('product.brandId = :brandId', { brandId })
			.setFindOptions({
				relationLoadStrategy: 'query',
				relations: {
					media: true,
				},
			})
			.andWhere('product.isArchived = false')
			.leftJoinAndSelect('product.variants', 'variant', 'variant.isArchived = false')
			.loadRelationCountAndMap('product.totalOrders', 'product.orderItems')
			.loadRelationCountAndMap('variant.ordersCount', 'variant.orderItems')
			.limit(pagination.limit)
			.offset(pagination.limit * pagination.page);

		this._buildInventoryQuery(findInventoryDto, mainQuery);

		const countQuery_1 = this.dataSource.manager
			.createQueryBuilder(ProductVariantEntity, 'variant')
			.leftJoinAndSelect('variant.mainProduct', 'product')
			.where('product.brandId = :brandId', { brandId })
			.andWhere('product.isArchived = false')
			.andWhere('variant.isArchived = false');
		this._buildInventoryQuery(findInventoryDto, countQuery_1);

		const countQuery_2 = this.dataSource.manager.count(ProductEntity, {
			where: { brandId, isArchived: false, variants: { id: IsNull() } },
		});

		const [products, count_1, count_2] = await Promise.all([
			mainQuery.getMany(),
			countQuery_1.getCount(),
			countQuery_2,
		]);

		mainQuery.getMany();

		const variantsIds = products.map((p) => p.variants.map((v) => v.id)).flat();
		const detailedVariants = await this.dataSource.manager.find(ProductVariantEntity, {
			where: { id: In(variantsIds) },
			relations: { media: true, optionValues: true },
		});

		products.forEach((product) => {
			product.variants = product.variants.map((variant) => {
				const detailedVariant = detailedVariants.find((v) => v.id === variant.id);
				variant.media = detailedVariant?.media;
				variant.optionValues = detailedVariant?.optionValues;
				return variant;
			});
		});
		const totalCount = count_1 + count_2;
		return { products, totalCount };
	}

	private _buildInventoryQuery(
		findInventoryDto: FindInventoryDto,
		qb: SelectQueryBuilder<ProductEntity> | SelectQueryBuilder<ProductVariantEntity>,
	) {
		const query = qb;

		if (findInventoryDto.status === StockStatus.Critical) {
			query.andWhere('variant.stock <= :criticalStock', {
				criticalStock: this.CRITICAL_STOCK_VALUE,
			});
		} else if (findInventoryDto.status === StockStatus.Optimal) {
			query.andWhere('variant.stock > :criticalStock', {
				criticalStock: this.CRITICAL_STOCK_VALUE,
			});
		}

		if (findInventoryDto.keyword) {
			query
				.leftJoin('product.category', 'category')
				.leftJoin('product.subCategory', 'subCategory')
				.leftJoin('product.collections', 'collections')
				.andWhere(
					new Brackets((qb) => {
						qb.where('product.title ILIKE :keyword', {
							keyword: `%${findInventoryDto.keyword}%`,
						})
							.orWhere('category.name ILIKE :keyword', {
								keyword: `%${findInventoryDto.keyword}%`,
							})
							.orWhere('subCategory.name ILIKE :keyword', {
								keyword: `%${findInventoryDto.keyword}%`,
							})
							.orWhere('collections.name ILIKE :keyword', {
								keyword: `%${findInventoryDto.keyword}%`,
							});
					}),
				);
		}
	}

	async markOutOfStock(ids: number[]) {
		const brandId = this.authContext.getUser()!.sub;
		const { products, totalCount } = await this.findAll({
			where: { id: In(ids), brandId, isArchived: false },
		});
		if (ids.length !== totalCount)
			throw new NotFoundException('Some products were not found');
		products.forEach((product) => (product.isOutOfStock = true));
		await this.dataSource.manager.update(ProductEntity, ids, { isOutOfStock: true });
		return products;
	}

	async updateStock(id: number, stock: number) {
		const brandId = this.authContext.getUser()!.sub;
		const product = await this.findOne({
			where: { id, brandId, isArchived: false },
		});
		product.stock = stock;
		product.lastStockUpdate = stock ? new Date() : product.lastStockUpdate;
		await this.dataSource.manager.update(ProductEntity, id, {
			stock,
			lastStockUpdate: product.lastStockUpdate,
		});
		return product;
	}

	async _skuExistsCheck(sku: string | string[]) {
		if (!sku || !sku.length) return;
		sku = Utils.stringOrArrayToArray(sku);
		sku = sku.filter(Boolean);
		if (sku.length !== new Set(sku).size)
			throw new ConflictException('Duplicate SKUs found');
		const exists = await this.dataSource.manager.exists(ProductEntity, {
			where: [
				{ sku: In(sku), isArchived: false },
				{ variants: { sku: In(sku), isArchived: false } },
			],
		});
		if (exists) throw new ConflictException('SKU already exists');
	}

	async findAllOptions() {
		const values = await this.dataSource.manager.find(ProductOptionValueEntity, {
			select: ['optionName', 'value'],
			where: { optionName: In(['color', 'size']) },
		});

		const options = {
			color: [],
			size: [],
		};

		values.forEach((value) => {
			if (!options[value.optionName].includes(value.value))
				options[value.optionName].push(value.value);
		});

		const response = [
			{ name: 'color', values: options.color },
			{ name: 'size', values: options.size },
		];

		return response;
	}
}
