import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { PromotionTypeEnum } from '../entities/enums';
import { PromotionStatusEnum } from '../entities/enums';
import { CartStatus } from '../../carts/entities/cart.entity';
import { GenderEnum } from '../../users/entities/shopper-profile.entity';
const UpdatePromoCodeSchema = v.pipe(
	v.object({
		deletedAt: v.optional(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		code: v.optional(v.string()),
		title: v.optional(v.string()),
		minPurchaseAmount: v.nullish(v.number()),
		perUserLimit: v.nullish(v.number()),
		totalLimit: v.nullish(v.number()),
		start: v.optional(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		end: v.optional(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		discountPercentage: v.optional(v.number()),
		type: v.optional(v.enum(PromotionTypeEnum)),
		status: v.optional(v.enum(PromotionStatusEnum)),
		carts: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						status: v.enum(CartStatus),
						promoCodeId: v.nullish(v.number()),
						shopperId: v.nullish(v.number()),
					}),
				),
			]),
		),
		orderItems: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						quantity: v.nullish(v.number()),
						unitSalePrice: v.nullish(v.number()),
						unitPurchasePrice: v.nullish(v.number()),
						totalSalePrice: v.nullish(v.number()),
						totalPurchasePrice: v.nullish(v.number()),
						brandOrderId: v.number(),
						productId: v.number(),
						variantId: v.number(),
						promoCodeId: v.number(),
					}),
				),
			]),
		),
		brand: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					storeName: v.nullish(v.string()),
					brandName: v.nullish(v.string()),
					storeBio: v.nullish(v.string()),
					website: v.nullish(v.string()),
					isPublished: v.boolean(),
					shippingCost: v.nullish(v.number()),
					currency: v.nullish(v.string()),
					brandManagerFullName: v.nullish(v.string()),
					logoId: v.nullish(v.number()),
					isFollowing: v.nullish(v.boolean()),
					hasStory: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
					followingCount: v.nullish(v.number()),
					postsCount: v.nullish(v.number()),
				}),
			]),
		),
		shopperProfile: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					username: v.nullish(v.string()),
					fullName: v.nullish(v.string()),
					dateOfBirth: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
					bio: v.string(),
					gender: v.nullish(v.enum(GenderEnum)),
					onboardingStep: v.nullish(v.number()),
					facebookProfileLink: v.nullish(v.string()),
					instagramProfileLink: v.string(),
					tiktokProfileLink: v.string(),
					isOutfitter: v.boolean(),
					isFollowing: v.nullish(v.boolean()),
					hasStory: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
					followingCount: v.nullish(v.number()),
					postsCount: v.nullish(v.number()),
					brandsCount: v.nullish(v.number()),
					engagementCount: v.nullish(v.number()),
				}),
			]),
		),
		products: v.nullish(
			v.union([
				v.array(
					v.object({
						isArchived: v.boolean(),
						title: v.nullish(v.string()),
						description: v.nullish(v.string()),
						basePrice: v.nullish(v.number()),
						sku: v.nullish(v.string()),
						currency: v.nullish(v.string()),
						stock: v.number(),
						lastStockUpdate: v.nullish(
							v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						),
						isOutOfStock: v.boolean(),
						isFeatured: v.boolean(),
						deliveryEstimationInDays: v.number(),
						brandId: v.nullish(v.number()),
						categoryId: v.nullish(v.number()),
						subCategoryId: v.nullish(v.number()),
						averageRating: v.number(),
						isSaved: v.boolean(),
					}),
				),
			]),
		),
		brandId: v.optional(v.number()),
		shopperId: v.optional(v.number()),
		ussageCount: v.optional(v.number()),
		totalMoneyDeducted: v.optional(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'PromoCodeEntity',
		carts: 'CartEntity',
		orderItems: 'OrderItemEntity',
		brand: 'BrandProfileEntity',
		shopperProfile: 'ShopperProfileEntity',
		products: 'ProductEntity',
	}),
);
export default UpdatePromoCodeSchema;

export type TUpdatePromoCodeSchemaInput = v.InferInput<typeof UpdatePromoCodeSchema>;
export type TUpdatePromoCodeSchemaOutput = v.InferOutput<typeof UpdatePromoCodeSchema>;
