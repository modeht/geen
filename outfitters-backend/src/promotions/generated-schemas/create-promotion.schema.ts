import * as v from 'valibot';

export const CreatePromotionSchema = v.pipe(v.object({title: v.string(),
discountPercentage: v.number(),
minPurchaseAmount: v.nullish(v.number()),
start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
notifications: v.nullish(v.union([v.array(v.number()), v.array(v.object({customContent: v.string(),
isRead: v.boolean(),
userId: v.number(),
collaborationId: v.number(),
commentId: v.number(),
promotionId: v.number(),
productId: v.number()}))])),
brand: v.nullish(v.union([v.number(), v.object({storeName: v.nullish(v.string()),
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
postsCount: v.nullish(v.number())})])),
seasonalPromotion: v.nullish(v.union([v.number(), v.object({title: v.string(),
start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())})])),
products: v.nullish(v.union([v.array(v.number()), v.array(v.object({isArchived: v.boolean(),
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
brandId: v.nullish(v.number()),
categoryId: v.nullish(v.number()),
subCategoryId: v.nullish(v.number()),
averageRating: v.number(),
isSaved: v.boolean()}))])),
orderItems: v.nullish(v.union([v.array(v.number()), v.array(v.object({quantity: v.nullish(v.number()),
unitSalePrice: v.nullish(v.number()),
unitPurchasePrice: v.nullish(v.number()),
totalSalePrice: v.nullish(v.number()),
totalPurchasePrice: v.nullish(v.number()),
brandOrderId: v.number(),
productId: v.number(),
variantId: v.number(),
promoCodeId: v.number()}))])),
isDeleted: v.boolean(),
seasonalPromotionId: v.nullish(v.number()),
brandId: v.number()}),v.metadata({notifications: 'NotificationEntity',
brand: 'BrandProfileEntity',
seasonalPromotion: 'SeasonalPromotionEntity',
products: 'ProductEntity',
orderItems: 'OrderItemEntity'}))

export type TCreatePromotionSchema = v.InferInput<typeof CreatePromotionSchema>