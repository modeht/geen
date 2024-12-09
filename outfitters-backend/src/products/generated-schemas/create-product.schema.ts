import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { NotificationType } from '../../notifications/entities/notification.entity';
import { PromotionTypeEnum } from '../../promotions/entities/enums';
import { PromotionTargetEnum } from '../../promotions/entities/enums';
import { PromotionStatusEnum } from '../../promotions/entities/enums';
const CreateProductSchema = v.pipe(
	v.object({
		isArchived: v.boolean(),
		title: v.nullish(v.string()),
		description: v.nullish(v.string()),
		basePrice: v.nullish(v.number()),
		sku: v.nullish(v.string()),
		currency: v.nullish(v.string()),
		stock: v.number(),
		lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		isOutOfStock: v.boolean(),
		isFeatured: v.boolean(),
		deliveryEstimationInDays: v.number(),
		media: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						mimetype: v.nullish(v.string()),
						url: v.nullish(v.string()),
						size: v.nullish(v.number()),
						width: v.nullish(v.number()),
						height: v.nullish(v.number()),
					}),
				),
			]),
		),
		variants: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						isArchived: v.boolean(),
						stock: v.number(),
						price: v.nullish(v.number()),
						lastStockUpdate: v.nullish(
							v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						),
						sku: v.nullish(v.string()),
						mainProductId: v.nullish(v.number()),
					}),
				),
			]),
		),
		options: v.nullish(
			v.union([v.array(v.object({ id: v.number() })), v.array(v.object({ name: v.string(), productId: v.number() }))]),
		),
		ratings: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						stars: v.nullish(v.number()),
						comment: v.nullish(v.string()),
						productId: v.number(),
						shopperId: v.number(),
					}),
				),
			]),
		),
		taggedIn: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						productId: v.nullish(v.number()),
						postId: v.nullish(v.number()),
						storyId: v.nullish(v.number()),
						affiliationLinkId: v.nullish(v.number()),
					}),
				),
			]),
		),
		affiliationLinks: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						isDisabled: v.boolean(),
						url: v.string(),
						productId: v.number(),
						shopperId: v.number(),
					}),
				),
			]),
		),
		notifications: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						type: v.enum(NotificationType),
						customContent: v.string(),
						isRead: v.boolean(),
						userId: v.number(),
						collaborationId: v.number(),
						commentId: v.number(),
						promotionId: v.number(),
						productId: v.number(),
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
		messages: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						readAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						content: v.nullish(v.string()),
						reaction: v.nullish(v.string()),
						fromId: v.number(),
						toId: v.number(),
						conversationId: v.number(),
						collaborationId: v.nullish(v.number()),
						postId: v.nullish(v.number()),
						storyId: v.nullish(v.number()),
						commentId: v.nullish(v.number()),
						productId: v.nullish(v.number()),
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
		category: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({ name: v.string(), isArchived: v.boolean(), superCategoryId: v.nullish(v.number()) }),
			]),
		),
		subCategory: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({ name: v.string(), isArchived: v.boolean(), superCategoryId: v.nullish(v.number()) }),
			]),
		),
		collections: v.nullish(
			v.union([
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
		carts: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						quantity: v.nullish(v.number()),
						cartId: v.number(),
						productId: v.number(),
						variantId: v.number(),
						affiliationLinkId: v.number(),
						totalPrice: v.number(),
						totalDiscountedPrice: v.number(),
						promoCodeApplied: v.boolean(),
						appliedpromotionsIds: v.array(v.number()),
					}),
				),
			]),
		),
		promotions: v.nullish(
			v.union([
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
		savedInCollections: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({ savedCollectionId: v.number(), productId: v.number(), postId: v.number(), userId: v.number() }),
				),
			]),
		),
		brandId: v.nullish(v.number()),
		categoryId: v.nullish(v.number()),
		subCategoryId: v.nullish(v.number()),
		averageRating: v.number(),
		isSaved: v.boolean(),
	}),
	v.metadata({
		[modelSymbol]: 'ProductEntity',
		media: 'MediaEntity',
		variants: 'ProductVariantEntity',
		options: 'ProductOptionEntity',
		ratings: 'ProductReviewEntity',
		taggedIn: 'TaggedProductEntity',
		affiliationLinks: 'AffiliationLinkEntity',
		notifications: 'NotificationEntity',
		orderItems: 'OrderItemEntity',
		messages: 'MessageEntity',
		brand: 'BrandProfileEntity',
		category: 'CategoryEntity',
		subCategory: 'CategoryEntity',
		collections: 'CollectionEntity',
		carts: 'CartItemsEntity',
		promotions: 'PromotionEntity',
		promoCodes: 'PromoCodeEntity',
		savedInCollections: 'SavedCollectionItemEntity',
	}),
);
export default CreateProductSchema;

export type TCreateProductSchemaInput = v.InferInput<typeof CreateProductSchema>;
export type TCreateProductSchemaOutput = v.InferOutput<typeof CreateProductSchema>;
