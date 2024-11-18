import * as v from 'valibot';


import { OrderPaymentMethod } from '../../orders/entities/order.entity'
import { OrderPaymentStatusEnum } from '../../orders/entities/order.entity'
import { GenderEnum } from '../entities/shopper-profile.entity'
export const CreateShippingAddressSchema = v.pipe(v.object({deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
isDefault: v.boolean(),
name: v.string(),
country: v.string(),
city: v.string(),
street: v.string(),
apartment: v.string(),
address: v.string(),
floor: v.string(),
building: v.string(),
latitude: v.string(),
longitude: v.string(),
orders: v.nullish(v.union([v.array(v.number()), v.array(v.object({paymentMethod: v.enum(OrderPaymentMethod),
paymentStatus: v.nullish(v.enum(OrderPaymentStatusEnum)),
totalSalePrice: v.nullish(v.number()),
totalPurchasePrice: v.nullish(v.number()),
totalShippingFees: v.nullish(v.number()),
cartId: v.number(),
shippingAddressId: v.number(),
shopperId: v.number()}))])),
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
shopperId: v.number()}),v.metadata({orders: 'OrderEntity',
shopperProfile: 'ShopperProfileEntity'}))

export type TCreateShippingAddressSchemaInput = v.InferInput<typeof CreateShippingAddressSchema>;
export type TCreateShippingAddressSchemaOutput = v.InferOutput<typeof CreateShippingAddressSchema>;
