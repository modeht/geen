import * as v from 'valibot';
import { searchMode } from '<<pathToOriginal>>';

export const CreateRecentSearchesSchema = v.pipe(v.object({keyword: v.nullish(v.string()),
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
userId: v.number()}),v.metadata({user: 'UserEntity'}))

export type TCreateRecentSearchesSchema = v.InferInput<typeof CreateRecentSearchesSchema>
