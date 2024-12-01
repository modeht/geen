import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';


import { AccountStatus } from '../../users/entities/user.entity'
import { LanguageEnum } from '../../../lib/enums'
const UpdateSavedCollectionSchema = v.pipe(v.object({name: v.nullish(v.string()),
items: v.nullish(v.union([v.array(v.object({id:v.number()})), v.array(v.object({savedCollectionId: v.number(),
productId: v.number(),
postId: v.number(),
userId: v.number()}))])),
user: v.nullish(v.union([v.object({ id: v.number() }), v.object({status: v.enum(AccountStatus),
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
userId: v.optional(v.number())}),v.metadata({[modelSymbol]: 'SavedCollectionEntity',
items: 'SavedCollectionItemEntity',
user: 'UserEntity'}));
export default UpdateSavedCollectionSchema;

export type TUpdateSavedCollectionSchemaInput = v.InferInput<typeof UpdateSavedCollectionSchema>;
export type TUpdateSavedCollectionSchemaOutput = v.InferOutput<typeof UpdateSavedCollectionSchema>;
