import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { AccountStatus } from '../entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
import { PromotionTypeEnum } from '../../promotions/entities/enums';
import { PromotionTargetEnum } from '../../promotions/entities/enums';
import { PromotionStatusEnum } from '../../promotions/entities/enums';
import { OrderStatusEnum } from '../../orders/entities/brand-orders.entity';
import { CollaborationStatusEnum } from '../../collaborations/entities/collaboration.entity';
const CreateBrandProfileSchema = v.pipe(
	v.object({
		storeName: v.nullish(v.string()),
		brandName: v.nullish(v.string()),
		storeBio: v.nullish(v.string()),
		website: v.nullish(v.string()),
		isPublished: v.boolean(),
		shippingCost: v.nullish(v.number()),
		currency: v.nullish(v.string()),
		brandManagerFullName: v.nullish(v.string()),
		user: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					status: v.enum(AccountStatus),
					email: v.nullish(v.string()),
					phone: v.nullish(v.string()),
					password: v.nullish(v.string()),
					firebaseId: v.nullish(v.string()),
					emailVerified: v.nullish(v.boolean()),
					isGoogleSignin: v.nullish(v.boolean()),
					isAppleSignin: v.nullish(v.boolean()),
					defaultLang: v.enum(LanguageEnum),
					isFollowing: v.nullish(v.boolean()),
					isBlockedBy: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
				}),
			]),
		),
		logo: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					mimetype: v.nullish(v.string()),
					url: v.nullish(v.string()),
					size: v.nullish(v.number()),
					width: v.nullish(v.number()),
					height: v.nullish(v.number()),
				}),
			]),
		),
		cover: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					mimetype: v.nullish(v.string()),
					url: v.nullish(v.string()),
					size: v.nullish(v.number()),
					width: v.nullish(v.number()),
					height: v.nullish(v.number()),
				}),
			]),
		),
		collections: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						name: v.nullish(v.string()),
						isFeatured: v.boolean(),
						isPublic: v.boolean(),
						brandId: v.nullish(v.number()),
					}),
				),
			]),
		),
		products: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
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
		promotions: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						title: v.string(),
						type: v.enum(PromotionTypeEnum),
						discountPercentage: v.number(),
						minPurchaseAmount: v.nullish(v.number()),
						start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						target: v.enum(PromotionTargetEnum),
						status: v.enum(PromotionStatusEnum),
						isDeleted: v.boolean(),
						seasonalPromotionId: v.nullish(v.number()),
						brandId: v.number(),
					}),
				),
			]),
		),
		promoCodes: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						code: v.string(),
						title: v.string(),
						minPurchaseAmount: v.nullish(v.number()),
						perUserLimit: v.nullish(v.number()),
						totalLimit: v.nullish(v.number()),
						start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						discountPercentage: v.number(),
						type: v.enum(PromotionTypeEnum),
						status: v.enum(PromotionStatusEnum),
						brandId: v.number(),
						shopperId: v.number(),
						ussageCount: v.number(),
						totalMoneyDeducted: v.number(),
					}),
				),
			]),
		),
		brandOrders: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						status: v.enum(OrderStatusEnum),
						totalSalePrice: v.nullish(v.number()),
						totalPurchasePrice: v.nullish(v.number()),
						shippingFees: v.nullish(v.number()),
						rating: v.nullish(v.number()),
						review: v.nullish(v.string()),
						expectedDeliveryDate: v.nullish(
							v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						),
						acceptedAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						shippedAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						deliveredAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						cancelledAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						orderId: v.number(),
						brandId: v.number(),
					}),
				),
			]),
		),
		preferences: v.nullish(
			v.union([v.array(v.object({ name: v.nullish(v.string()), mediaId: v.nullish(v.number()) }))]),
		),
		collaborations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						status: v.enum(CollaborationStatusEnum),
						brandId: v.nullish(v.number()),
						shopperId: v.nullish(v.number()),
					}),
				),
			]),
		),
		categories: v.nullish(
			v.union([
				v.array(
					v.object({
						name: v.string(),
						isArchived: v.boolean(),
						superCategoryId: v.nullish(v.number()),
						test: v.nullish(v.any()),
					}),
				),
			]),
		),
		subCategories: v.nullish(
			v.union([
				v.array(
					v.object({
						name: v.string(),
						isArchived: v.boolean(),
						superCategoryId: v.nullish(v.number()),
						test: v.nullish(v.any()),
					}),
				),
			]),
		),
		countries: v.nullish(
			v.union([
				v.array(
					v.object({
						name: v.string(),
						code: v.string(),
						dialCode: v.string(),
						isSupported: v.boolean(),
						brands: v.any(),
						iconId: v.number(),
					}),
				),
			]),
		),
		logoId: v.nullish(v.number()),
		isFollowing: v.nullish(v.boolean()),
		hasStory: v.nullish(v.boolean()),
		followersCount: v.nullish(v.number()),
		followingCount: v.nullish(v.number()),
		postsCount: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'BrandProfileEntity',
		user: 'UserEntity',
		logo: 'MediaEntity',
		cover: 'MediaEntity',
		collections: 'CollectionEntity',
		products: 'ProductEntity',
		promotions: 'PromotionEntity',
		promoCodes: 'PromoCodeEntity',
		brandOrders: 'BrandOrderEntity',
		preferences: 'PreferenceEntity',
		collaborations: 'CollaborationEntity',
		categories: 'CategoryEntity',
		subCategories: 'CategoryEntity',
		countries: 'CountryEntity',
	}),
);
export default CreateBrandProfileSchema;

export type TCreateBrandProfileSchemaInput = v.InferInput<typeof CreateBrandProfileSchema>;
export type TCreateBrandProfileSchemaOutput = v.InferOutput<typeof CreateBrandProfileSchema>;
