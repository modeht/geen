import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaFiltersSchema, ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import { ReadCollaborationFiltersSchema, ReadCollaborationFiltersSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration-filters.schema'
import { ReadPostFiltersSchema, ReadPostFiltersSchemaFilters } from '../../posts/generated-schemas/read-post-filters.schema'
import { ReadStoryFiltersSchema, ReadStoryFiltersSchemaFilters } from '../../stories/generated-schemas/read-story-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'
import { ReadConversationFiltersSchema, ReadConversationFiltersSchemaFilters } from '../../conversations/generated-schemas/read-conversation-filters.schema'
import { ReadUserFiltersSchema, ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'
import { ReadCommentFiltersSchema, ReadCommentFiltersSchemaFilters } from '../../comments/generated-schemas/read-comment-filters.schema'



export class ReadMessageFiltersSchemaFilters {readAt?: GenericComparable<"date"> | null | undefined;
content?: GenericComparable<"string"> | null | undefined;
media?: ReadMediaFiltersSchemaFilters | null | undefined;
reaction?: GenericComparable<"string"> | null | undefined;
collaboration?: ReadCollaborationFiltersSchemaFilters | null | undefined;
post?: ReadPostFiltersSchemaFilters | null | undefined;
story?: ReadStoryFiltersSchemaFilters | null | undefined;
product?: ReadProductFiltersSchemaFilters | null | undefined;
conversation?: ReadConversationFiltersSchemaFilters | null | undefined;
from?: ReadUserFiltersSchemaFilters | null | undefined;
to?: ReadUserFiltersSchemaFilters | null | undefined;
comment?: ReadCommentFiltersSchemaFilters | null | undefined;
fromId?: GenericComparable<"number"> | null | undefined;
toId?: GenericComparable<"number"> | null | undefined;
conversationId?: GenericComparable<"number"> | null | undefined;
collaborationId?: GenericComparable<"number"> | null | undefined;
postId?: GenericComparable<"number"> | null | undefined;
storyId?: GenericComparable<"number"> | null | undefined;
commentId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined}

export const ReadMessageFiltersSchema: v.GenericSchema<ReadMessageFiltersSchemaFilters> = v.object({readAt: v.nullish(comparable("date")),
content: v.nullish(comparable("string")),
media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
reaction: v.nullish(comparable("string")),
collaboration: v.nullish(v.lazy(() => ReadCollaborationFiltersSchema)),
post: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
story: v.nullish(v.lazy(() => ReadStoryFiltersSchema)),
product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
conversation: v.nullish(v.lazy(() => ReadConversationFiltersSchema)),
from: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
to: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
comment: v.nullish(v.lazy(() => ReadCommentFiltersSchema)),
fromId: v.nullish(comparable("number")),
toId: v.nullish(comparable("number")),
conversationId: v.nullish(comparable("number")),
collaborationId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number")),
storyId: v.nullish(comparable("number")),
commentId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number"))})



export type TReadMessageFiltersSchemaOutput = v.InferOutput<typeof ReadMessageFiltersSchema>;
export type TReadMessageFiltersSchemaInput = v.InferInput<typeof ReadMessageFiltersSchema>;
