import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, { ReadUserFiltersSchemaFilters } from './read-user-filters.schema';
import ReadCategoryFiltersSchema, {
	ReadCategoryFiltersSchemaFilters,
} from '../../categories/generated-schemas/read-category-filters.schema';

export class ReadUserInterestFiltersSchemaFilters {
	user?: ReadUserFiltersSchemaFilters | null;
	userId?: GenericComparable<'number'> | null;
	category?: ReadCategoryFiltersSchemaFilters | null;
	categoryId?: GenericComparable<'number'> | null;
	count?: GenericComparable<'number'> | null;
}

const ReadUserInterestFiltersSchema: v.GenericSchema<ReadUserInterestFiltersSchemaFilters> = v.object({
	user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	userId: v.nullish(comparable('number')),
	category: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
	categoryId: v.nullish(comparable('number')),
	count: v.nullish(comparable('number')),
});

export default ReadUserInterestFiltersSchema;

export type TReadUserInterestFiltersSchemaOutput = v.InferOutput<typeof ReadUserInterestFiltersSchema>;
export type TReadUserInterestFiltersSchemaInput = v.InferInput<typeof ReadUserInterestFiltersSchema>;
