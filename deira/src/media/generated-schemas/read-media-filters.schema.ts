import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadAdFiltersSchema, { ReadAdFiltersSchemaFilters } from '../../ads/generated-schemas/read-ad-filters.schema';
import ReadCategoryFiltersSchema, {
	ReadCategoryFiltersSchemaFilters,
} from '../../categories/generated-schemas/read-category-filters.schema';
import ReadNotificationFiltersSchema, {
	ReadNotificationFiltersSchemaFilters,
} from '../../notifications/generated-schemas/read-notification-filters.schema';
import ReadBannerFiltersSchema, {
	ReadBannerFiltersSchemaFilters,
} from '../../banners/generated-schemas/read-banner-filters.schema';
import ReadMessageFiltersSchema, {
	ReadMessageFiltersSchemaFilters,
} from '../../messages/generated-schemas/read-message-filters.schema';

export class ReadMediaFiltersSchemaFilters {
	ad?: ReadAdFiltersSchemaFilters | null;
	categories?: ReadCategoryFiltersSchemaFilters | null;
	notifications?: ReadNotificationFiltersSchemaFilters | null;
	banner?: ReadBannerFiltersSchemaFilters | null;
	messages?: ReadMessageFiltersSchemaFilters | null;
	mimetype?: GenericComparable<'string'> | null;
	url?: GenericComparable<'string'> | null;
	size?: GenericComparable<'number'> | null;
	width?: GenericComparable<'number'> | null;
	height?: GenericComparable<'number'> | null;
}

const ReadMediaFiltersSchema: v.GenericSchema<ReadMediaFiltersSchemaFilters> = v.object({
	ad: v.nullish(v.lazy(() => ReadAdFiltersSchema)),
	categories: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
	notifications: v.nullish(v.lazy(() => ReadNotificationFiltersSchema)),
	banner: v.nullish(v.lazy(() => ReadBannerFiltersSchema)),
	messages: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
	mimetype: v.nullish(comparable('string')),
	url: v.nullish(comparable('string')),
	size: v.nullish(comparable('number')),
	width: v.nullish(comparable('number')),
	height: v.nullish(comparable('number')),
});

export default ReadMediaFiltersSchema;

export type TReadMediaFiltersSchemaOutput = v.InferOutput<typeof ReadMediaFiltersSchema>;
export type TReadMediaFiltersSchemaInput = v.InferInput<typeof ReadMediaFiltersSchema>;
