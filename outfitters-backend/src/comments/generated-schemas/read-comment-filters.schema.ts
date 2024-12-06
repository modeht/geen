import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadPostFiltersSchema, {
	ReadPostFiltersSchemaFilters,
} from '../../posts/generated-schemas/read-post-filters.schema';
import ReadNotificationFiltersSchema, {
	ReadNotificationFiltersSchemaFilters,
} from '../../notifications/generated-schemas/read-notification-filters.schema';
import ReadMessageFiltersSchema, {
	ReadMessageFiltersSchemaFilters,
} from '../../messages/generated-schemas/read-message-filters.schema';

export class ReadCommentFiltersSchemaFilters {
	content?: GenericComparable<'string'> | null;
	commentor?: ReadUserFiltersSchemaFilters | null;
	post?: ReadPostFiltersSchemaFilters | null;
	level?: GenericComparable<'number'> | null;
	notifications?: ReadNotificationFiltersSchemaFilters | null;
	messages?: ReadMessageFiltersSchemaFilters | null;
	userId?: GenericComparable<'number'> | null;
	replyToId?: GenericComparable<'number'> | null;
	postId?: GenericComparable<'number'> | null;
	repliesDepth?: GenericComparable<'number'> | null;
}

const ReadCommentFiltersSchema: v.GenericSchema<ReadCommentFiltersSchemaFilters> = v.object({
	content: v.nullish(comparable('string')),
	commentor: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	post: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
	level: v.nullish(comparable('number')),
	notifications: v.nullish(v.lazy(() => ReadNotificationFiltersSchema)),
	messages: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
	userId: v.nullish(comparable('number')),
	replyToId: v.nullish(comparable('number')),
	postId: v.nullish(comparable('number')),
	repliesDepth: v.nullish(comparable('number')),
});

export default ReadCommentFiltersSchema;

export type TReadCommentFiltersSchemaOutput = v.InferOutput<typeof ReadCommentFiltersSchema>;
export type TReadCommentFiltersSchemaInput = v.InferInput<typeof ReadCommentFiltersSchema>;
