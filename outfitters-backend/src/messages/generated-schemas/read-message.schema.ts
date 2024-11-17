import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadCollaborationSchema, ReadCollaborationSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration.schema'
import { ReadPostSchema, ReadPostSchemaFilters } from '../../posts/generated-schemas/read-post.schema'
import { ReadStorySchema, ReadStorySchemaFilters } from '../../stories/generated-schemas/read-story.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'
import { ReadConversationSchema, ReadConversationSchemaFilters } from '../../conversations/generated-schemas/read-conversation.schema'
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'
import { ReadCommentSchema, ReadCommentSchemaFilters } from '../../comments/generated-schemas/read-comment.schema'

export class ReadMessageSchemaFilters {readAt?: GenericComparable<"date"> | null | undefined;
content?: GenericComparable<"string"> | null | undefined;
media?: ReadMediaSchemaFilters | null | undefined;
reaction?: GenericComparable<"string"> | null | undefined;
collaboration?: ReadCollaborationSchemaFilters | null | undefined;
post?: ReadPostSchemaFilters | null | undefined;
story?: ReadStorySchemaFilters | null | undefined;
product?: ReadProductSchemaFilters | null | undefined;
conversation?: ReadConversationSchemaFilters | null | undefined;
from?: ReadUserSchemaFilters | null | undefined;
to?: ReadUserSchemaFilters | null | undefined;
comment?: ReadCommentSchemaFilters | null | undefined;
fromId?: GenericComparable<"number"> | null | undefined;
toId?: GenericComparable<"number"> | null | undefined;
conversationId?: GenericComparable<"number"> | null | undefined;
collaborationId?: GenericComparable<"number"> | null | undefined;
postId?: GenericComparable<"number"> | null | undefined;
storyId?: GenericComparable<"number"> | null | undefined;
commentId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined}

export const ReadMessageSchema: v.GenericSchema<ReadMessageSchemaFilters> = v.object({readAt: v.nullish(comparable("date")),
content: v.nullish(comparable("string")),
media: v.nullish(v.lazy(() => ReadMediaSchema)),
reaction: v.nullish(comparable("string")),
collaboration: v.nullish(v.lazy(() => ReadCollaborationSchema)),
post: v.nullish(v.lazy(() => ReadPostSchema)),
story: v.nullish(v.lazy(() => ReadStorySchema)),
product: v.nullish(v.lazy(() => ReadProductSchema)),
conversation: v.nullish(v.lazy(() => ReadConversationSchema)),
from: v.nullish(v.lazy(() => ReadUserSchema)),
to: v.nullish(v.lazy(() => ReadUserSchema)),
comment: v.nullish(v.lazy(() => ReadCommentSchema)),
fromId: v.nullish(comparable("number")),
toId: v.nullish(comparable("number")),
conversationId: v.nullish(comparable("number")),
collaborationId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number")),
storyId: v.nullish(comparable("number")),
commentId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number"))})



export type TReadMessageSchema = v.InferOutput<typeof ReadMessageSchema>
export type TReadMessageSchemaInput = v.InferInput<typeof ReadMessageSchema>
