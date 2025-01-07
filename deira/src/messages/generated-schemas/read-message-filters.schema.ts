import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadConversationFiltersSchema, {
	ReadConversationFiltersSchemaFilters,
} from '../../conversations/generated-schemas/read-conversation-filters.schema';
import ReadAdFiltersSchema, { ReadAdFiltersSchemaFilters } from '../../ads/generated-schemas/read-ad-filters.schema';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';

export class ReadMessageFiltersSchemaFilters {
	sender?: ReadUserFiltersSchemaFilters | null;
	receiver?: ReadUserFiltersSchemaFilters | null;
	content?: GenericComparable<'string'> | null;
	isRead?: GenericComparable<'bool'> | null;
	conversation?: ReadConversationFiltersSchemaFilters | null;
	ad?: ReadAdFiltersSchemaFilters | null;
	media?: ReadMediaFiltersSchemaFilters | null;
}

const ReadMessageFiltersSchema: v.GenericSchema<ReadMessageFiltersSchemaFilters> = v.object({
	sender: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	receiver: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	content: v.nullish(comparable('string')),
	isRead: v.nullish(comparable('bool')),
	conversation: v.nullish(v.lazy(() => ReadConversationFiltersSchema)),
	ad: v.nullish(v.lazy(() => ReadAdFiltersSchema)),
	media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
});

export default ReadMessageFiltersSchema;

export type TReadMessageFiltersSchemaOutput = v.InferOutput<typeof ReadMessageFiltersSchema>;
export type TReadMessageFiltersSchemaInput = v.InferInput<typeof ReadMessageFiltersSchema>;
