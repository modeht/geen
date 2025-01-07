import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadMessageFiltersSchema, {
	ReadMessageFiltersSchemaFilters,
} from '../../messages/generated-schemas/read-message-filters.schema';

export class ReadConversationFiltersSchemaFilters {
	initiator?: ReadUserFiltersSchemaFilters | null;
	target?: ReadUserFiltersSchemaFilters | null;
	messages?: ReadMessageFiltersSchemaFilters | null;
}

const ReadConversationFiltersSchema: v.GenericSchema<ReadConversationFiltersSchemaFilters> = v.object({
	initiator: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	target: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	messages: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
});

export default ReadConversationFiltersSchema;

export type TReadConversationFiltersSchemaOutput = v.InferOutput<typeof ReadConversationFiltersSchema>;
export type TReadConversationFiltersSchemaInput = v.InferInput<typeof ReadConversationFiltersSchema>;
