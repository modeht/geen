import * as v from 'valibot';

export const CreateSavedCollectionSchema = v.pipe(v.object({name: v.nullish(v.string()),
items: v.nullish(v.union([v.array(v.number()), v.array(v.object({savedCollectionId: v.number(),
productId: v.number(),
postId: v.number(),
userId: v.number()}))])),
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
userId: v.number()}),v.metadata({items: 'SavedCollectionItemEntity',
user: 'UserEntity'}))

export type TCreateSavedCollectionSchema = v.InferInput<typeof CreateSavedCollectionSchema>
