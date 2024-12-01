import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';
import ReadCollaborationFiltersSchema, {
	ReadCollaborationFiltersSchemaFilters,
} from '../../collaborations/generated-schemas/read-collaboration-filters.schema';
import ReadPostFiltersSchema, {
	ReadPostFiltersSchemaFilters,
} from '../../posts/generated-schemas/read-post-filters.schema';
import ReadStoryFiltersSchema, {
	ReadStoryFiltersSchemaFilters,
} from '../../stories/generated-schemas/read-story-filters.schema';
import ReadProductFiltersSchema, {
	ReadProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-filters.schema';
import ReadConversationFiltersSchema, {
	ReadConversationFiltersSchemaFilters,
} from '../../conversations/generated-schemas/read-conversation-filters.schema';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadCommentFiltersSchema, {
	ReadCommentFiltersSchemaFilters,
} from '../../comments/generated-schemas/read-comment-filters.schema';

export class ReadMessageFiltersSchemaFilters {
	readAt?: GenericComparable<'date'> | null;
	content?: GenericComparable<'string'> | null;
	media?: ReadMediaFiltersSchemaFilters | null;
	reaction?: GenericComparable<'string'> | null;
	collaboration?: ReadCollaborationFiltersSchemaFilters | null;
	post?: ReadPostFiltersSchemaFilters | null;
	story?: ReadStoryFiltersSchemaFilters | null;
	product?: ReadProductFiltersSchemaFilters | null;
	conversation?: ReadConversationFiltersSchemaFilters | null;
	from?: ReadUserFiltersSchemaFilters | null;
	to?: ReadUserFiltersSchemaFilters | null;
	comment?: ReadCommentFiltersSchemaFilters | null;
	fromId?: GenericComparable<'number'> | null;
	toId?: GenericComparable<'number'> | null;
	conversationId?: GenericComparable<'number'> | null;
	collaborationId?: GenericComparable<'number'> | null;
	postId?: GenericComparable<'number'> | null;
	storyId?: GenericComparable<'number'> | null;
	commentId?: GenericComparable<'number'> | null;
	productId?: GenericComparable<'number'> | null;
}

const ReadMessageFiltersSchema: v.GenericSchema<ReadMessageFiltersSchemaFilters> =
	v.object({
		readAt: v.nullish(comparable('date')),
		content: v.nullish(comparable('string')),
		media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
		reaction: v.nullish(comparable('string')),
		collaboration: v.nullish(v.lazy(() => ReadCollaborationFiltersSchema)),
		post: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
		story: v.nullish(v.lazy(() => ReadStoryFiltersSchema)),
		product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
		conversation: v.nullish(v.lazy(() => ReadConversationFiltersSchema)),
		from: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
		to: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
		comment: v.nullish(v.lazy(() => ReadCommentFiltersSchema)),
		fromId: v.nullish(comparable('number')),
		toId: v.nullish(comparable('number')),
		conversationId: v.nullish(comparable('number')),
		collaborationId: v.nullish(comparable('number')),
		postId: v.nullish(comparable('number')),
		storyId: v.nullish(comparable('number')),
		commentId: v.nullish(comparable('number')),
		productId: v.nullish(comparable('number')),
	});

export default ReadMessageFiltersSchema;

export type TReadMessageFiltersSchemaOutput = v.InferOutput<
	typeof ReadMessageFiltersSchema
>;
export type TReadMessageFiltersSchemaInput = v.InferInput<
	typeof ReadMessageFiltersSchema
>;
