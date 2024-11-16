import * as v from 'valibot';
import { GenderEnum } from '<<pathToOriginal>>';

export const CreateShopperProfileSchema = v.pipe(v.object({username: v.nullish(v.string()),
fullName: v.nullish(v.string()),
dateOfBirth: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
bio: v.string(),
onboardingStep: v.nullish(v.number()),
facebookProfileLink: v.nullish(v.string()),
instagramProfileLink: v.string(),
tiktokProfileLink: v.string(),
isOutfitter: v.boolean(),
user: v.nullish(v.union([v.number(), v.object({email: v.nullish(v.string()),
phone: v.nullish(v.string()),
password: v.nullish(v.string()),
firebaseId: v.nullish(v.string()),
emailVerified: v.nullish(v.boolean()),
isGoogleSignin: v.nullish(v.boolean()),
isAppleSignin: v.nullish(v.boolean()),
isFollowing: v.nullish(v.boolean()),
isBlockedBy: v.nullish(v.boolean()),
followersCount: v.nullish(v.number())})])),
reviews: v.nullish(v.union([v.array(v.number()), v.array(v.object({stars: v.nullish(v.number()),
comment: v.nullish(v.string()),
productId: v.number(),
shopperId: v.number()}))])),
addresses: v.nullish(v.union([v.array(v.number()), v.array(v.object({deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
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
shopperId: v.number()}))])),
profilePicture: v.nullish(v.union([v.number(), v.object({mimetype: v.nullish(v.string()),
url: v.nullish(v.string()),
size: v.nullish(v.number()),
width: v.nullish(v.number()),
height: v.nullish(v.number())})])),
carts: v.nullish(v.union([v.array(v.number()), v.array(v.object({promoCodeId: v.nullish(v.number()),
shopperId: v.nullish(v.number())}))])),
orders: v.nullish(v.union([v.array(v.number()), v.array(v.object({totalSalePrice: v.nullish(v.number()),
totalPurchasePrice: v.nullish(v.number()),
totalShippingFees: v.nullish(v.number()),
cartId: v.number(),
shippingAddressId: v.number(),
shopperId: v.number()}))])),
preferences: v.nullish(v.union([v.array(v.number()), v.array(v.object({name: v.nullish(v.string()),
mediaId: v.nullish(v.number())}))])),
collaborations: v.nullish(v.union([v.array(v.number()), v.array(v.object({brandId: v.nullish(v.number()),
shopperId: v.nullish(v.number())}))])),
affiliationLinks: v.nullish(v.union([v.array(v.number()), v.array(v.object({isDisabled: v.boolean(),
url: v.string(),
productId: v.number(),
shopperId: v.number()}))])),
promoCodes: v.nullish(v.union([v.array(v.number()), v.array(v.object({deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
code: v.string(),
title: v.string(),
minPurchaseAmount: v.nullish(v.number()),
perUserLimit: v.nullish(v.number()),
totalLimit: v.nullish(v.number()),
start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
discountPercentage: v.number(),
brandId: v.number(),
shopperId: v.number(),
ussageCount: v.number(),
totalMoneyDeducted: v.number()}))])),
isFollowing: v.nullish(v.boolean()),
hasStory: v.nullish(v.boolean()),
followersCount: v.nullish(v.number()),
followingCount: v.nullish(v.number()),
postsCount: v.nullish(v.number()),
brandsCount: v.nullish(v.number()),
engagementCount: v.nullish(v.number())}),v.metadata({user: 'UserEntity',
reviews: 'ProductReviewEntity',
addresses: 'ShippingAddressEntity',
profilePicture: 'MediaEntity',
carts: 'CartEntity',
orders: 'OrderEntity',
preferences: 'PreferenceEntity',
collaborations: 'CollaborationEntity',
affiliationLinks: 'AffiliationLinkEntity',
promoCodes: 'PromoCodeEntity'}))

export type TCreateShopperProfileSchema = v.InferInput<typeof CreateShopperProfileSchema>