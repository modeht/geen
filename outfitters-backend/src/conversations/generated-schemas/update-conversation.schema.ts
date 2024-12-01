import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';


import { AccountStatus } from '../../users/entities/user.entity'
import { LanguageEnum } from '../../../lib/enums'
export const UpdateConversationSchema = v.pipe(v.object({isSupport: v.optional(v.boolean()),
from: v.nullish(v.union([v.object({ id: v.number() }), v.object({status: v.enum(AccountStatus),
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
to: v.nullish(v.union([v.object({ id: v.number() }), v.object({status: v.enum(AccountStatus),
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
archivedByFrom: v.optional(v.boolean()),
archivedByTo: v.optional(v.boolean()),
fromId: v.optional(v.number()),
toId: v.optional(v.number()),
isCollaboration: v.optional(v.boolean())}),v.metadata({[modelSymbol]: 'ConversationEntity',
from: 'UserEntity',
to: 'UserEntity',
messages: 'MessageEntity'}))

export type TUpdateConversationSchemaInput = v.InferInput<typeof UpdateConversationSchema>;
export type TUpdateConversationSchemaOutput = v.InferOutput<typeof UpdateConversationSchema>;
