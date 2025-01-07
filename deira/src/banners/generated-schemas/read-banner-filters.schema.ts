import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadCategoryFiltersSchema, {
	ReadCategoryFiltersSchemaFilters,
} from '../../categories/generated-schemas/read-category-filters.schema';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';

export class ReadBannerFiltersSchemaFilters {
	category?: ReadCategoryFiltersSchemaFilters | null;
	createdBy?: ReadUserFiltersSchemaFilters | null;
	createdFor?: ReadUserFiltersSchemaFilters | null;
	title?: GenericComparable<'string'> | null;
	media?: ReadMediaFiltersSchemaFilters | null;
	whatsapp?: GenericComparable<'string'> | null;
	phoneNumber?: GenericComparable<'string'> | null;
	totalViews?: GenericComparable<'number'> | null;
	inHomePage?: GenericComparable<'bool'> | null;
	durationDays?: GenericComparable<'number'> | null;
	start?: GenericComparable<'date'> | null;
	end?: GenericComparable<'date'> | null;
}

const ReadBannerFiltersSchema: v.GenericSchema<ReadBannerFiltersSchemaFilters> = v.object({
	category: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
	createdBy: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	createdFor: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	title: v.nullish(comparable('string')),
	media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
	whatsapp: v.nullish(comparable('string')),
	phoneNumber: v.nullish(comparable('string')),
	totalViews: v.nullish(comparable('number')),
	inHomePage: v.nullish(comparable('bool')),
	durationDays: v.nullish(comparable('number')),
	start: v.nullish(comparable('date')),
	end: v.nullish(comparable('date')),
});

export default ReadBannerFiltersSchema;

export type TReadBannerFiltersSchemaOutput = v.InferOutput<typeof ReadBannerFiltersSchema>;
export type TReadBannerFiltersSchemaInput = v.InferInput<typeof ReadBannerFiltersSchema>;
