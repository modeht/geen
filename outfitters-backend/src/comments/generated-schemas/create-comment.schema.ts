import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';


import { AccountStatus } from '../../users/entities/user.entity'
import { LanguageEnum } from '../../../lib/enums'
import { NotificationType } from '../../notifications/entities/notification.entity'
export const CreateCommentSchema = v.pipe(v.object({content: v.string(),
commentor: v.nullish(v.union([v.object({ id: v.number() }), v.object({status: v.enum(AccountStatus),
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
post: v.nullish(v.union([v.object({ id: v.number() }), v.object({caption: v.nullish(v.string()),
postedById: v.number(),
thumbnailId: v.nullish(v.number()),
likesCount: v.number(),
commentsCount: v.number(),
taggedProductsCount: v.number(),
taggedUsersCount: v.number(),
isLiked: v.optional(v.boolean())})])),
level: v.number(),
notifications: v.nullish(v.union([v.array(v.object({id:v.number()})), v.array(v.object({type: v.enum(NotificationType),
customContent: v.string(),
isRead: v.boolean(),
userId: v.number(),
collaborationId: v.number(),
commentId: v.number(),
promotionId: v.number(),
productId: v.number()}))])),
messages: v.nullish(v.union([v.array(v.object({id:v.number()})), v.array(v.object({readAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
content: v.nullish(v.string()),
reaction: v.nullish(v.string()),
fromId: v.number(),
toId: v.number(),
conversationId: v.number(),
collaborationId: v.nullish(v.number()),
postId: v.nullish(v.number()),
storyId: v.nullish(v.number()),
commentId: v.nullish(v.number()),
productId: v.nullish(v.number())}))])),
userId: v.number(),
replyToId: v.optional(v.number()),
postId: v.optional(v.number()),
repliesDepth: v.number()}),v.metadata({[modelSymbol]: 'CommentEntity',
commentor: 'UserEntity',
post: 'PostEntity',
notifications: 'NotificationEntity',
messages: 'MessageEntity'}))

export type TCreateCommentSchemaInput = v.InferInput<typeof CreateCommentSchema>;
export type TCreateCommentSchemaOutput = v.InferOutput<typeof CreateCommentSchema>;
