import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'
import { ReadPostSchema, ReadPostSchemaFilters } from '../../posts/generated-schemas/read-post.schema'
import { ReadNotificationSchema, ReadNotificationSchemaFilters } from '../../notifications/generated-schemas/read-notification.schema'
import { ReadMessageSchema, ReadMessageSchemaFilters } from '../../messages/generated-schemas/read-message.schema'

export class ReadCommentSchemaFilters {content?: GenericComparable<"string"> | null | undefined;
commentor?: ReadUserSchemaFilters | null | undefined;
post?: ReadPostSchemaFilters | null | undefined;
level?: GenericComparable<"number"> | null | undefined;
notifications?: ReadNotificationSchemaFilters | null | undefined;
messages?: ReadMessageSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined;
replyToId?: GenericComparable<"number"> | null | undefined;
postId?: GenericComparable<"number"> | null | undefined;
repliesDepth?: GenericComparable<"number"> | null | undefined}

export const ReadCommentSchema: v.GenericSchema<ReadCommentSchemaFilters> = v.object({content: v.nullish(comparable("string")),
commentor: v.nullish(v.lazy(() => ReadUserSchema)),
post: v.nullish(v.lazy(() => ReadPostSchema)),
level: v.nullish(comparable("number")),
notifications: v.nullish(v.lazy(() => ReadNotificationSchema)),
messages: v.nullish(v.lazy(() => ReadMessageSchema)),
userId: v.nullish(comparable("number")),
replyToId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number")),
repliesDepth: v.nullish(comparable("number"))})



export type TReadCommentSchema = v.InferOutput<typeof ReadCommentSchema>
export type TReadCommentSchemaInput = v.InferInput<typeof ReadCommentSchema>
