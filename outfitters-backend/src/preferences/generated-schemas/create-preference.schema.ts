import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';


import { GenderEnum } from '../../users/entities/shopper-profile.entity'
export const CreatePreferenceSchema = v.pipe(v.object({media: v.nullish(v.union([v.object({ id: v.number() }), v.object({mimetype: v.nullish(v.string()),
url: v.nullish(v.string()),
size: v.nullish(v.number()),
width: v.nullish(v.number()),
height: v.nullish(v.number())})])),
name: v.nullish(v.string()),
brandProfile: v.nullish(v.union([v.array(v.object({id:v.number()})), v.array(v.object({storeName: v.nullish(v.string()),
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
postsCount: v.nullish(v.number())}))])),
shopperProfile: v.nullish(v.union([v.array(v.object({id:v.number()})), v.array(v.object({username: v.nullish(v.string()),
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
engagementCount: v.nullish(v.number())}))])),
mediaId: v.nullish(v.number())}),v.metadata({[modelSymbol]: 'PreferenceEntity',
media: 'MediaEntity',
brandProfile: 'BrandProfileEntity',
shopperProfile: 'ShopperProfileEntity'}))

export type TCreatePreferenceSchemaInput = v.InferInput<typeof CreatePreferenceSchema>;
export type TCreatePreferenceSchemaOutput = v.InferOutput<typeof CreatePreferenceSchema>;
