import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadTranslationFiltersSchema, {
	ReadTranslationFiltersSchemaFilters,
} from '../../translations/generated-schemas/read-translation-filters.schema';
import ReadCountryFiltersSchema, {
	ReadCountryFiltersSchemaFilters,
} from '../../countries/generated-schemas/read-country-filters.schema';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadAdFiltersSchema, { ReadAdFiltersSchemaFilters } from '../../ads/generated-schemas/read-ad-filters.schema';

export class ReadGovernorateFiltersSchemaFilters {
	name?: GenericComparable<'string'> | null;
	translations?: ReadTranslationFiltersSchemaFilters | null;
	country?: ReadCountryFiltersSchemaFilters | null;
	users?: ReadUserFiltersSchemaFilters | null;
	ads?: ReadAdFiltersSchemaFilters | null;
}

const ReadGovernorateFiltersSchema: v.GenericSchema<ReadGovernorateFiltersSchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	translations: v.nullish(v.lazy(() => ReadTranslationFiltersSchema)),
	country: v.nullish(v.lazy(() => ReadCountryFiltersSchema)),
	users: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	ads: v.nullish(v.lazy(() => ReadAdFiltersSchema)),
});

export default ReadGovernorateFiltersSchema;

export type TReadGovernorateFiltersSchemaOutput = v.InferOutput<typeof ReadGovernorateFiltersSchema>;
export type TReadGovernorateFiltersSchemaInput = v.InferInput<typeof ReadGovernorateFiltersSchema>;
