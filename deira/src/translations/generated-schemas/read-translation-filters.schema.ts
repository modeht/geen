import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadCategoryFilterFiltersSchema, {
	ReadCategoryFilterFiltersSchemaFilters,
} from '../../category-fitlers/generated-schemas/read-category-filter-filters.schema';
import ReadWalletLogFiltersSchema, {
	ReadWalletLogFiltersSchemaFilters,
} from '../../wallets/generated-schemas/read-wallet-log-filters.schema';
import ReadCategoryFiltersSchema, {
	ReadCategoryFiltersSchemaFilters,
} from '../../categories/generated-schemas/read-category-filters.schema';
import ReadPlanFiltersSchema, {
	ReadPlanFiltersSchemaFilters,
} from '../../plans/generated-schemas/read-plan-filters.schema';
import ReadCountryFiltersSchema, {
	ReadCountryFiltersSchemaFilters,
} from '../../countries/generated-schemas/read-country-filters.schema';
import ReadGovernorateFiltersSchema, {
	ReadGovernorateFiltersSchemaFilters,
} from '../../governorate/generated-schemas/read-governorate-filters.schema';

import { LanguageEnum } from '../../../lib/enums';
export class ReadTranslationFiltersSchemaFilters {
	categoryFilter?: ReadCategoryFilterFiltersSchemaFilters | null;
	log?: ReadWalletLogFiltersSchemaFilters | null;
	category?: ReadCategoryFiltersSchemaFilters | null;
	plan?: ReadPlanFiltersSchemaFilters | null;
	country?: ReadCountryFiltersSchemaFilters | null;
	governorate?: ReadGovernorateFiltersSchemaFilters | null;
	language?: LanguageEnum | null;
}

const ReadTranslationFiltersSchema: v.GenericSchema<ReadTranslationFiltersSchemaFilters> = v.object({
	categoryFilter: v.nullish(v.lazy(() => ReadCategoryFilterFiltersSchema)),
	log: v.nullish(v.lazy(() => ReadWalletLogFiltersSchema)),
	category: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
	plan: v.nullish(v.lazy(() => ReadPlanFiltersSchema)),
	country: v.nullish(v.lazy(() => ReadCountryFiltersSchema)),
	governorate: v.nullish(v.lazy(() => ReadGovernorateFiltersSchema)),
	language: v.nullish(v.enum(LanguageEnum)),
});

export default ReadTranslationFiltersSchema;

export type TReadTranslationFiltersSchemaOutput = v.InferOutput<typeof ReadTranslationFiltersSchema>;
export type TReadTranslationFiltersSchemaInput = v.InferInput<typeof ReadTranslationFiltersSchema>;
