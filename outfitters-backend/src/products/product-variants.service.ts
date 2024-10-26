import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { AuthContext } from '../auth/auth.context';
import { MediaEntity } from '../media/entities/media.entity';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { ProductOptionValueEntity } from './entities/product-option-value.entity';
import { ProductOptionEntity } from './entities/product-option.entity';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductVariantsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	async create(productId: number, createProductVariantDto: CreateProductVariantDto) {
		const productVariant = new ProductVariantEntity();
		const brandId = this.authContext.getUser().sub;

		if (createProductVariantDto.sku) {
			await this._skuExistsCheck(createProductVariantDto.sku);
		}

		productVariant.price = createProductVariantDto.price;
		productVariant.stock = createProductVariantDto.stock;
		productVariant.sku = createProductVariantDto.sku;

		productVariant.mainProduct = {
			id: productId,
			brandId,
		} as ProductEntity;

		(productVariant.optionValues = createProductVariantDto.attributes?.map((attr) => {
			const optionValue = {
				value: attr.attributeValue,
				productId,
				optionName: attr.attributeName,

				option: {
					name: attr.attributeName,
					productId,
				} as ProductOptionEntity,
			} as ProductOptionValueEntity;

			return optionValue;
		})),
			(productVariant.media = createProductVariantDto.mediaIds?.map(
				(id) => ({ id }) as MediaEntity,
			));

		return this.dataSource.manager.save(productVariant);
	}

	async update(
		productId: number,
		id: number,
		updateProductVariantDto: UpdateProductVariantDto,
	) {
		const brandId = this.authContext.getUser().sub;
		let productVariant = await this.findOne(productId, id, brandId, {
			orderItems: true,
			media: true,
			optionValues: {
				option: true,
			},
		});

		const canUpdate = !productVariant.orderItems?.length;
		let archivedVariant: ProductVariantEntity;
		if (!canUpdate) {
			archivedVariant = this.archiveVariant(productVariant);
		}

		if (updateProductVariantDto.price)
			productVariant.price = updateProductVariantDto.price;

		if (updateProductVariantDto.sku == null) productVariant.sku = null;
		else if (
			updateProductVariantDto.sku &&
			updateProductVariantDto.sku !== productVariant.sku
		) {
			await this._skuExistsCheck(updateProductVariantDto.sku);
			productVariant.sku = updateProductVariantDto.sku;
		}

		if (
			(updateProductVariantDto.stock ?? 0) > 0 &&
			productVariant.stock != updateProductVariantDto.stock
		) {
			productVariant.stock = updateProductVariantDto.stock;
			productVariant.lastStockUpdate = new Date();
		}

		if (updateProductVariantDto.mediaIds === null) {
			productVariant.media = [];
		} else if (updateProductVariantDto.mediaIds) {
			productVariant.media = updateProductVariantDto.mediaIds.map(
				(id) => ({ id }) as MediaEntity,
			);
		}

		productVariant.optionValues = undefined;

		if (archivedVariant) {
			[productVariant, archivedVariant] = await this.dataSource.manager.save([
				productVariant,
				archivedVariant,
			]);
			return productVariant;
		}
		return this.dataSource.manager.save(productVariant);
	}

	archiveVariant(productVariant: ProductVariantEntity) {
		const archivedVariant = new ProductVariantEntity();
		archivedVariant.isArchived = true;
		archivedVariant.mainProductId = productVariant.mainProductId;
		archivedVariant.price = productVariant.price;
		archivedVariant.stock = 0;
		archivedVariant.sku = productVariant.sku;
		archivedVariant.lastStockUpdate = productVariant.lastStockUpdate;
		archivedVariant.optionValues = productVariant.optionValues?.map((attr) => {
			const optionValue = {
				value: attr.value,
				productId: productVariant.mainProductId,
				optionName: attr.option.name,

				option: {
					name: attr.option.name,
					productId: productVariant.mainProductId,
				} as ProductOptionEntity,
			} as ProductOptionValueEntity;

			return optionValue;
		});
		archivedVariant.media = productVariant.media?.map(
			(media) =>
				({
					url: media.url,
					size: media.size,
					height: media.height,
					mimetype: media.mimetype,
					width: media.width,
				}) as MediaEntity,
		);
		archivedVariant.orderItems = productVariant.orderItems;
		productVariant.orderItems = [];

		return archivedVariant;
	}

	async findOne(
		productId: number,
		variantId: number,
		brandId: number,
		relations?: FindOptionsRelations<ProductVariantEntity>,
	) {
		const productVariant = await this.dataSource.manager.findOne(ProductVariantEntity, {
			where: {
				isArchived: false,
				id: variantId,
				mainProductId: productId,
				mainProduct: {
					id: productId,
					brandId,
				},
			},
			relations,
		});
		if (!productVariant) throw new BadRequestException('Product variant not found');
		return productVariant;
	}

	async remove(productId: number, id: number) {
		const brandId = this.authContext.getUser().sub;
		const productVariant = await this.findOne(productId, id, brandId);
		productVariant.isArchived = true;
		await this.dataSource.manager.save(productVariant);
		return productVariant;
	}

	async updateStock(productId: number, id: number, stock: number) {
		const brandId = this.authContext.getUser().sub;
		const productVariant = await this.findOne(productId, id, brandId);
		productVariant.stock = stock;
		productVariant.lastStockUpdate = stock ? new Date() : null;
		await this.dataSource.manager.update(ProductVariantEntity, productVariant.id, {
			stock: productVariant.stock,
			lastStockUpdate: productVariant.lastStockUpdate,
		});
		return productVariant;
	}

	async _skuExistsCheck(sku: string) {
		if (!sku) return;
		const exists = await this.dataSource.manager.exists(ProductEntity, {
			where: [
				{ sku: sku, isArchived: false },
				{ variants: { sku: sku, isArchived: false } },
			],
		});
		if (exists) throw new ConflictException('SKU already exists');
	}
}
