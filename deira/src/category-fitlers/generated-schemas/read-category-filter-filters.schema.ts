import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadTranslationFiltersSchema, {
	ReadTranslationFiltersSchemaFilters,
} from '../../translations/generated-schemas/read-translation-filters.schema';
import ReadCategoryFiltersSchema, {
	ReadCategoryFiltersSchemaFilters,
} from '../../categories/generated-schemas/read-category-filters.schema';
import ReadAdFiltersSchema, { ReadAdFiltersSchemaFilters } from '../../ads/generated-schemas/read-ad-filters.schema';

export class ReadCategoryFilterFiltersSchemaFilters {
	translations?: ReadTranslationFiltersSchemaFilters | null;
	name?: GenericComparable<'string'> | null;
	category?: ReadCategoryFiltersSchemaFilters | null;
	categories?: ReadCategoryFiltersSchemaFilters | null;
	ads?: ReadAdFiltersSchemaFilters | null;
	isArchived?: GenericComparable<'bool'> | null;
}

const ReadCategoryFilterFiltersSchema: v.GenericSchema<ReadCategoryFilterFiltersSchemaFilters> = v.object({
	translations: v.nullish(v.lazy(() => ReadTranslationFiltersSchema)),
	name: v.nullish(comparable('string')),
	category: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
	categories: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
	ads: v.nullish(v.lazy(() => ReadAdFiltersSchema)),
	isArchived: v.nullish(comparable('bool')),
});

export default ReadCategoryFilterFiltersSchema;

export type TReadCategoryFilterFiltersSchemaOutput = v.InferOutput<typeof ReadCategoryFilterFiltersSchema>;
export type TReadCategoryFilterFiltersSchemaInput = v.InferInput<typeof ReadCategoryFilterFiltersSchema>;
