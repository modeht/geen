import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserInterestFiltersSchema, {
	ReadUserInterestFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-interest-filters.schema';
import ReadBannerFiltersSchema, {
	ReadBannerFiltersSchemaFilters,
} from '../../banners/generated-schemas/read-banner-filters.schema';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';
import ReadTranslationFiltersSchema, {
	ReadTranslationFiltersSchemaFilters,
} from '../../translations/generated-schemas/read-translation-filters.schema';
import ReadCategoryFilterFiltersSchema, {
	ReadCategoryFilterFiltersSchemaFilters,
} from '../../category-fitlers/generated-schemas/read-category-filter-filters.schema';
import ReadAdFiltersSchema, { ReadAdFiltersSchemaFilters } from '../../ads/generated-schemas/read-ad-filters.schema';

export class ReadCategoryFiltersSchemaFilters {
	name?: GenericComparable<'string'> | null;
	interestedIn?: ReadUserInterestFiltersSchemaFilters | null;
	banners?: ReadBannerFiltersSchemaFilters | null;
	icon?: ReadMediaFiltersSchemaFilters | null;
	translations?: ReadTranslationFiltersSchemaFilters | null;
	filters?: ReadCategoryFilterFiltersSchemaFilters | null;
	ads?: ReadAdFiltersSchemaFilters | null;
	filter?: ReadCategoryFilterFiltersSchemaFilters | null;
	visible?: GenericComparable<'bool'> | null;
	isArchived?: GenericComparable<'bool'> | null;
	index?: GenericComparable<'number'> | null;
}

const ReadCategoryFiltersSchema: v.GenericSchema<ReadCategoryFiltersSchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	interestedIn: v.nullish(v.lazy(() => ReadUserInterestFiltersSchema)),
	banners: v.nullish(v.lazy(() => ReadBannerFiltersSchema)),
	icon: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
	translations: v.nullish(v.lazy(() => ReadTranslationFiltersSchema)),
	filters: v.nullish(v.lazy(() => ReadCategoryFilterFiltersSchema)),
	ads: v.nullish(v.lazy(() => ReadAdFiltersSchema)),
	filter: v.nullish(v.lazy(() => ReadCategoryFilterFiltersSchema)),
	visible: v.nullish(comparable('bool')),
	isArchived: v.nullish(comparable('bool')),
	index: v.nullish(comparable('number')),
});

export default ReadCategoryFiltersSchema;

export type TReadCategoryFiltersSchemaOutput = v.InferOutput<typeof ReadCategoryFiltersSchema>;
export type TReadCategoryFiltersSchemaInput = v.InferInput<typeof ReadCategoryFiltersSchema>;
