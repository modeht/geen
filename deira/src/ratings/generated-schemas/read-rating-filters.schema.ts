import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';

export class ReadRatingFiltersSchemaFilters {
	stars?: GenericComparable<'number'> | null;
	review?: GenericComparable<'string'> | null;
	reviewer?: ReadUserFiltersSchemaFilters | null;
	reviewed?: ReadUserFiltersSchemaFilters | null;
}

const ReadRatingFiltersSchema: v.GenericSchema<ReadRatingFiltersSchemaFilters> = v.object({
	stars: v.nullish(comparable('number')),
	review: v.nullish(comparable('string')),
	reviewer: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	reviewed: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
});

export default ReadRatingFiltersSchema;

export type TReadRatingFiltersSchemaOutput = v.InferOutput<typeof ReadRatingFiltersSchema>;
export type TReadRatingFiltersSchemaInput = v.InferInput<typeof ReadRatingFiltersSchema>;
