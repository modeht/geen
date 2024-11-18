import * as v from 'valibot';


import { AccountStatus } from '../../users/entities/user.entity'
import { LanguageEnum } from '../../../lib/enums'
export const CreateAffiliationLinkTrackingSchema = v.pipe(v.object({affiliationLink: v.nullish(v.union([v.number(), v.object({isDisabled: v.boolean(),
url: v.string(),
productId: v.number(),
shopperId: v.number()})])),
user: v.nullish(v.union([v.number(), v.object({status: v.enum(AccountStatus),
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
followersCount: v.nullish(v.number())})])),
referrer: v.nullish(v.string()),
country: v.string(),
ipAddress: v.nullish(v.string()),
userAgent: v.nullish(v.string())}),v.metadata({affiliationLink: 'AffiliationLinkEntity',
user: 'UserEntity'}))

export type TCreateAffiliationLinkTrackingSchemaInput = v.InferInput<typeof CreateAffiliationLinkTrackingSchema>;
export type TCreateAffiliationLinkTrackingSchemaOutput = v.InferOutput<typeof CreateAffiliationLinkTrackingSchema>;
