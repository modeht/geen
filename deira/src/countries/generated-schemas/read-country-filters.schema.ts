import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadTranslationFiltersSchema, {
	ReadTranslationFiltersSchemaFilters,
} from '../../translations/generated-schemas/read-translation-filters.schema';
import ReadGovernorateFiltersSchema, {
	ReadGovernorateFiltersSchemaFilters,
} from '../../governorate/generated-schemas/read-governorate-filters.schema';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';

export class ReadCountryFiltersSchemaFilters {
	name?: GenericComparable<'string'> | null;
	translations?: ReadTranslationFiltersSchemaFilters | null;
	governorates?: ReadGovernorateFiltersSchemaFilters | null;
	users?: ReadUserFiltersSchemaFilters | null;
}

const ReadCountryFiltersSchema: v.GenericSchema<ReadCountryFiltersSchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	translations: v.nullish(v.lazy(() => ReadTranslationFiltersSchema)),
	governorates: v.nullish(v.lazy(() => ReadGovernorateFiltersSchema)),
	users: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
});

export default ReadCountryFiltersSchema;

export type TReadCountryFiltersSchemaOutput = v.InferOutput<typeof ReadCountryFiltersSchema>;
export type TReadCountryFiltersSchemaInput = v.InferInput<typeof ReadCountryFiltersSchema>;
