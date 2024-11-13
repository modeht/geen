import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindManyOptions, FindOptionsWhere, In } from 'typeorm';
import { randomBytes } from 'crypto';
import { AuthContext } from '../../auth/auth.context';
import { CollaborationEntity } from '../../collaborations/entities/collaboration.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { addUserEngagementToQuery } from '../../users/common-queries';
import { CreatePromoCodeDto } from '../dto/create-promo-code.dto';
import { UpdatePromoCodeDto } from '../dto/update-promo-code.dto';
import { PromoCodeEntity } from '../entities/promo-code.entity';

@Injectable()
export class PromoCodesService {
	constructor(
		private readonly datasource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	async create(createPromoCodeDto: CreatePromoCodeDto) {
		const brandId = this.authContext.getUser()!.sub;
		const promoCode = new PromoCodeEntity();
		promoCode.brandId = brandId;
		promoCode.title = createPromoCodeDto.title;
		promoCode.minPurchaseAmount = createPromoCodeDto.minPurchaseAmount;
		promoCode.perUserLimit = createPromoCodeDto.perUserLimit;
		promoCode.totalLimit = createPromoCodeDto.totalLimit;
		promoCode.start = createPromoCodeDto.start;
		promoCode.end = createPromoCodeDto.end;
		promoCode.discountPercentage = createPromoCodeDto.discountPercentage;
		promoCode.type = createPromoCodeDto.type;
		promoCode.status = createPromoCodeDto.status;
		promoCode.shopperId = createPromoCodeDto.outfitterId;

		const [products, uniqueCode] = await Promise.all([
			this._getProductIds(
				createPromoCodeDto.productIds,
				createPromoCodeDto.categoryIds,
				createPromoCodeDto.subCategoryIds,
				brandId,
			),
			this._generateUniqueCode(),
			this._validateCollaboration(createPromoCodeDto.outfitterId, brandId),
		]);
		promoCode.products = products;
		promoCode.code = uniqueCode;

		return this.datasource.manager.save(PromoCodeEntity, promoCode);
	}

	// TODO: Handle case when promo code is used in an order
	async update(id: number, updatePromoCodeDto: UpdatePromoCodeDto) {
		const brandId = this.authContext.getUser()!.sub;
		const promoCode = await this.findOne({ id, brandId });
		promoCode.title = updatePromoCodeDto.title ?? promoCode.title;
		promoCode.minPurchaseAmount =
			updatePromoCodeDto.minPurchaseAmount ?? promoCode.minPurchaseAmount;
		promoCode.perUserLimit = updatePromoCodeDto.perUserLimit ?? promoCode.perUserLimit;
		promoCode.totalLimit = updatePromoCodeDto.totalLimit ?? promoCode.totalLimit;
		promoCode.start = updatePromoCodeDto.start ?? promoCode.start;
		promoCode.end = updatePromoCodeDto.end ?? promoCode.end;
		promoCode.discountPercentage =
			updatePromoCodeDto.discountPercentage ?? promoCode.discountPercentage;
		promoCode.type = updatePromoCodeDto.type ?? promoCode.type;
		promoCode.status = updatePromoCodeDto.status ?? promoCode.status;

		if (updatePromoCodeDto.outfitterId) {
			await this._validateCollaboration(
				updatePromoCodeDto.outfitterId,
				promoCode.brandId,
			);
			promoCode.shopperId = updatePromoCodeDto.outfitterId;
		}
		if (
			updatePromoCodeDto.productIds ||
			updatePromoCodeDto.categoryIds ||
			updatePromoCodeDto.subCategoryIds
		) {
			const products = await this._getProductIds(
				updatePromoCodeDto.productIds,
				updatePromoCodeDto.categoryIds,
				updatePromoCodeDto.subCategoryIds,
				brandId,
			);
			promoCode.products = products;
		}

		return this.datasource.manager.save(PromoCodeEntity, promoCode);
	}

	// TODO: Adjust based on order status
	async findAll(opts: FindManyOptions<PromoCodeEntity>) {
		const [promoCodes, totalCount] = await this.datasource.manager
			.createQueryBuilder(PromoCodeEntity, 'promoCode')

			.addSelect(
				(sq) =>
					sq
						.select('COUNT(DISTINCT "brandOrderId" )')
						.from('order_items', 'orderItem')
						.where('"orderItem"."promoCodeId" = "promoCode"."id"'),
				'promoCode_ussageCount',
			)

			.addSelect(
				(sq) =>
					sq
						.select(
							'COALESCE(SUM(COALESCE("totalSalePrice", 0) - COALESCE("totalPurchasePrice", 0)), 0)',
						)
						.from('order_items', 'orderItem')
						.where('"orderItem"."promoCodeId" = "promoCode"."id"'),
				'promoCode_totalMoneyDeducted',
			)

			.setFindOptions(opts)
			.getManyAndCount();
		return { promoCodes, totalCount };
	}

	async findOne(whereOpts: FindOptionsWhere<PromoCodeEntity>) {
		const qb = this.datasource.manager
			.createQueryBuilder(PromoCodeEntity, 'promoCode')
			.setFindOptions({
				where: whereOpts,
			})
			.leftJoinAndSelect('promoCode.products', 'products')
			.leftJoinAndSelect('products.media', 'media')
			.leftJoinAndSelect('products.category', 'category')
			.leftJoinAndSelect('products.subCategory', 'subCategory')
			.leftJoinAndSelect('promoCode.shopperProfile', 'shopperProfile')
			.leftJoinAndSelect('shopperProfile.profilePicture', 'profilePicture');

		addUserEngagementToQuery('shopperProfile', qb, true);

		const promoCode = await qb.getOne();

		if (!promoCode) throw new NotFoundException('Promo code not found');
		return promoCode;
	}

	async remove(id: number) {
		const brandId = this.authContext.getUser()!.sub;
		const promoCode = await this.findOne({ id, brandId });
		await this.datasource.manager.softDelete(PromoCodeEntity, id);
		return promoCode;
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

	private async _validateCollaboration(shopperId: number, brandId: number) {
		const collabExists = await this.datasource.manager.existsBy(CollaborationEntity, {
			brandId,
			shopperId,
		});
		if (!collabExists) {
			throw new NotFoundException('Collaboration not found');
		}
	}

	private async _generateUniqueCode(): Promise<string> {
		const maxAttempts = 100; // Maximum number of attempts to find a unique code
		let attempts = 0;

		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charsLength = chars.length;

		const codeExists = async (code: string) =>
			this.datasource.manager.existsBy(PromoCodeEntity, {
				code,
			});

		while (attempts < maxAttempts) {
			// Generate 9 random bytes to cover the 12 alphanumeric characters (efficient mapping)
			const randomBytesArray = randomBytes(9);
			let result = '';

			for (let i = 0; i < 9; i++) {
				result += chars[randomBytesArray[i] % charsLength];
			}

			if (!(await codeExists(result))) return result;

			attempts++;
		}

		throw new Error('Unable to generate a unique code after maximum attempts');
	}
}
