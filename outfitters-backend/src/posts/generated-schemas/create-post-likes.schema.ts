import * as v from 'valibot';


import { AccountStatus } from '../../users/entities/user.entity'
import { LanguageEnum } from '../../../lib/enums'
export const CreatePostLikesSchema = v.pipe(v.object({user: v.nullish(v.union([v.number(), v.object({status: v.enum(AccountStatus),
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
post: v.nullish(v.union([v.number(), v.object({caption: v.nullish(v.string()),
postedById: v.number(),
thumbnailId: v.nullish(v.number()),
likesCount: v.number(),
commentsCount: v.number(),
taggedProductsCount: v.number(),
taggedUsersCount: v.number(),
isLiked: v.undefinedable(v.boolean())})])),
userId: v.number(),
postId: v.number()}),v.metadata({user: 'UserEntity',
post: 'PostEntity'}))

export type TCreatePostLikesSchemaInput = v.InferInput<typeof CreatePostLikesSchema>;
export type TCreatePostLikesSchemaOutput = v.InferOutput<typeof CreatePostLikesSchema>;
