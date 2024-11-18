import * as v from 'valibot';


import { CartStatus } from '../entities/cart.entity'
import { OrderPaymentMethod } from '../../orders/entities/order.entity'
import { OrderPaymentStatusEnum } from '../../orders/entities/order.entity'
import { GenderEnum } from '../../users/entities/shopper-profile.entity'
import { PromotionTypeEnum } from '../../promotions/entities/enums'
import { PromotionStatusEnum } from '../../promotions/entities/enums'
export const CreateCartSchema = v.pipe(v.object({status: v.enum(CartStatus),
order: v.nullish(v.union([v.number(), v.object({paymentMethod: v.enum(OrderPaymentMethod),
paymentStatus: v.nullish(v.enum(OrderPaymentStatusEnum)),
totalSalePrice: v.nullish(v.number()),
totalPurchasePrice: v.nullish(v.number()),
totalShippingFees: v.nullish(v.number()),
cartId: v.number(),
shippingAddressId: v.number(),
shopperId: v.number()})])),
items: v.nullish(v.union([v.array(v.number()), v.array(v.object({quantity: v.nullish(v.number()),
cartId: v.number(),
productId: v.number(),
variantId: v.number(),
affiliationLinkId: v.number(),
totalPrice: v.number(),
totalDiscountedPrice: v.number(),
promoCodeApplied: v.boolean(),
appliedpromotionsIds: v.array(v.number())}))])),
shopperProfile: v.nullish(v.union([v.number(), v.object({username: v.nullish(v.string()),
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
engagementCount: v.nullish(v.number())})])),
promoCode: v.nullish(v.union([v.number(), v.object({deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
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
totalMoneyDeducted: v.number()})])),
promoCodeId: v.nullish(v.number()),
shopperId: v.nullish(v.number())}),v.metadata({order: 'OrderEntity',
items: 'CartItemsEntity',
shopperProfile: 'ShopperProfileEntity',
promoCode: 'PromoCodeEntity'}))

export type TCreateCartSchemaInput = v.InferInput<typeof CreateCartSchema>;
export type TCreateCartSchemaOutput = v.InferOutput<typeof CreateCartSchema>;
