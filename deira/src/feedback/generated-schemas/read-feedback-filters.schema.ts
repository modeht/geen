import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';

export class ReadFeedbackFiltersSchemaFilters {
	message?: GenericComparable<'string'> | null;
	user?: ReadUserFiltersSchemaFilters | null;
}

const ReadFeedbackFiltersSchema: v.GenericSchema<ReadFeedbackFiltersSchemaFilters> = v.object({
	message: v.nullish(comparable('string')),
	user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
});

export default ReadFeedbackFiltersSchema;

export type TReadFeedbackFiltersSchemaOutput = v.InferOutput<typeof ReadFeedbackFiltersSchema>;
export type TReadFeedbackFiltersSchemaInput = v.InferInput<typeof ReadFeedbackFiltersSchema>;
