import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindManyOptions } from 'typeorm';
import { In } from 'typeorm';
import { AuthContext } from '../../auth/auth.context';
import { ProductEntity } from '../../products/entities/product.entity';
import { CreatePromotionDto } from '../dto/create-promotion.dto';
import { UpdatePromotionDto } from '../dto/update-promotion.dto';
import { PromotionEntity } from '../entities/promotion.entity';

@Injectable()
export class PromotionsService {
	constructor(
		private datasource: DataSource,
		private authContext: AuthContext,
	) {}

	async create(createPromotionDto: CreatePromotionDto): Promise<PromotionEntity> {
		const brandId = this.authContext.getUser()!.sub;

		const newPromotion = new PromotionEntity();
		newPromotion.title = createPromotionDto.title;
		newPromotion.type = createPromotionDto.type;
		newPromotion.start = createPromotionDto.start;
		newPromotion.end = createPromotionDto.end;
		newPromotion.target = createPromotionDto.target;
		newPromotion.minPurchaseAmount = createPromotionDto.minPurchaseAmount;
		newPromotion.discountPercentage = createPromotionDto.discountPercentage;
		newPromotion.brandId = brandId;

		const products = await this._getProductIds(
			createPromotionDto.productIds,
			createPromotionDto.categoryIds,
			createPromotionDto.subCategoryIds,
			brandId,
		);
		newPromotion.products = products;

		return this.datasource.manager.save(PromotionEntity, newPromotion);
	}

	async findAll(opts: FindManyOptions<PromotionEntity>) {
		const [promotions, totalCount] = await this.datasource.manager.findAndCount(
			PromotionEntity,
			opts,
		);

		return { promotions, totalCount };
	}

	async findOne(id: number, throwIfNotFound = true) {
		const promotion = await this.datasource.manager.findOne(PromotionEntity, {
			where: { id, isDeleted: false },
			relations: {
				products: { media: true, category: true, subCategory: true },
				brand: true,
			},
		});

		if (!promotion && throwIfNotFound) {
			throw new NotFoundException('Promotion not found');
		}

		return promotion;
	}
	// TODO: Handle case where promotion is already applied to the product
	async update(id: number, updatePromotionDto: UpdatePromotionDto) {
		const brandId = this.authContext.getUser()!.sub;
		const promotion = await this.findOne(id);
		if (promotion.brandId !== brandId) {
			throw new NotFoundException('Promotion not found');
		}
		promotion.title = updatePromotionDto.title ?? promotion.title;
		promotion.type = updatePromotionDto.type ?? promotion.type;
		promotion.start = updatePromotionDto.start ?? promotion.start;
		promotion.end = updatePromotionDto.end ?? promotion.end;
		promotion.target = updatePromotionDto.target ?? promotion.target;
		promotion.minPurchaseAmount =
			updatePromotionDto.minPurchaseAmount ?? promotion.minPurchaseAmount;
		promotion.discountPercentage =
			updatePromotionDto.discountPercentage ?? promotion.discountPercentage;
		promotion.status = updatePromotionDto.status ?? promotion.status;

		if (
			updatePromotionDto.productIds ||
			updatePromotionDto.categoryIds ||
			updatePromotionDto.subCategoryIds
		) {
			const products = await this._getProductIds(
				updatePromotionDto.productIds,
				updatePromotionDto.categoryIds,
				updatePromotionDto.subCategoryIds,
				brandId,
			);
			promotion.products = products;
		}

		await this.datasource.manager.save(PromotionEntity, promotion);
		return promotion;
	}

	async remove(id: number) {
		const brandId = this.authContext.getUser()!.sub;
		const promotion = await this.findOne(id);
		if (promotion.brandId !== brandId) {
			throw new NotFoundException('Promotion not found');
		}
		await this.datasource.manager.update(PromotionEntity, { id }, { isDeleted: true });
		return promotion;
	}

	private async _getProductIds(
		productIds: number[],
		categoryIds: number[],
		subCategoryIds: number[],
		brandId: number,
	) {
		const baseCondition = { brandId, isArchived: false };
		const products = await this.datasource.manager.findBy(ProductEntity, [
			productIds && {
				...baseCondition,
				id: In(productIds),
			},
			categoryIds && {
				...baseCondition,
				categoryId: In(categoryIds),
			},
			subCategoryIds && {
				...baseCondition,
				subCategoryId: In(subCategoryIds),
			},
		]);

		const producstIds = products.map((product) => product.id);
		const notFoundIds = productIds?.filter((id) => !producstIds.includes(id));

		if (notFoundIds && notFoundIds.length > 0) {
			throw new NotFoundException(`Invalid product IDs: ${notFoundIds.join(', ')}`);
		}
		return products;
	}
}
