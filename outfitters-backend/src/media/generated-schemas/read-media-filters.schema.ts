import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadPreferenceFiltersSchema, {
	ReadPreferenceFiltersSchemaFilters,
} from '../../preferences/generated-schemas/read-preference-filters.schema';
import ReadCollectionFiltersSchema, {
	ReadCollectionFiltersSchemaFilters,
} from '../../collections/generated-schemas/read-collection-filters.schema';
import ReadShopperProfileFiltersSchema, {
	ReadShopperProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-shopper-profile-filters.schema';
import ReadStoryFiltersSchema, {
	ReadStoryFiltersSchemaFilters,
} from '../../stories/generated-schemas/read-story-filters.schema';
import ReadBrandProfileFiltersSchema, {
	ReadBrandProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-brand-profile-filters.schema';
import ReadCategoryFiltersSchema, {
	ReadCategoryFiltersSchemaFilters,
} from '../../categories/generated-schemas/read-category-filters.schema';
import ReadCountryFiltersSchema, {
	ReadCountryFiltersSchemaFilters,
} from '../../countries/generated-schemas/read-country-filters.schema';
import ReadPostFiltersSchema, {
	ReadPostFiltersSchemaFilters,
} from '../../posts/generated-schemas/read-post-filters.schema';
import ReadProductFiltersSchema, {
	ReadProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-filters.schema';
import ReadProductVariantFiltersSchema, {
	ReadProductVariantFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-variant-filters.schema';
import ReadMessageFiltersSchema, {
	ReadMessageFiltersSchemaFilters,
} from '../../messages/generated-schemas/read-message-filters.schema';
import ReadProductReviewFiltersSchema, {
	ReadProductReviewFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-review-filters.schema';

export class ReadMediaFiltersSchemaFilters {
	preference?: ReadPreferenceFiltersSchemaFilters | null;
	collectionCover?: ReadCollectionFiltersSchemaFilters | null;
	user?: ReadShopperProfileFiltersSchemaFilters | null;
	story?: ReadStoryFiltersSchemaFilters | null;
	brandStoreCover?: ReadBrandProfileFiltersSchemaFilters | null;
	brandStoreLogo?: ReadBrandProfileFiltersSchemaFilters | null;
	category?: ReadCategoryFiltersSchemaFilters | null;
	country?: ReadCountryFiltersSchemaFilters | null;
	postThumbnail?: ReadPostFiltersSchemaFilters | null;
	product?: ReadProductFiltersSchemaFilters | null;
	productVariant?: ReadProductVariantFiltersSchemaFilters | null;
	message?: ReadMessageFiltersSchemaFilters | null;
	post?: ReadPostFiltersSchemaFilters | null;
	review?: ReadProductReviewFiltersSchemaFilters | null;
	mimetype?: GenericComparable<'string'> | null;
	url?: GenericComparable<'string'> | null;
	size?: GenericComparable<'number'> | null;
	width?: GenericComparable<'number'> | null;
	height?: GenericComparable<'number'> | null;
}

const ReadMediaFiltersSchema: v.GenericSchema<ReadMediaFiltersSchemaFilters> = v.object({
	preference: v.nullish(v.lazy(() => ReadPreferenceFiltersSchema)),
	collectionCover: v.nullish(v.lazy(() => ReadCollectionFiltersSchema)),
	user: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
	story: v.nullish(v.lazy(() => ReadStoryFiltersSchema)),
	brandStoreCover: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
	brandStoreLogo: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
	category: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
	country: v.nullish(v.lazy(() => ReadCountryFiltersSchema)),
	postThumbnail: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
	product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
	productVariant: v.nullish(v.lazy(() => ReadProductVariantFiltersSchema)),
	message: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
	post: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
	review: v.nullish(v.lazy(() => ReadProductReviewFiltersSchema)),
	mimetype: v.nullish(comparable('string')),
	url: v.nullish(comparable('string')),
	size: v.nullish(comparable('number')),
	width: v.nullish(comparable('number')),
	height: v.nullish(comparable('number')),
});

export default ReadMediaFiltersSchema;

export type TReadMediaFiltersSchemaOutput = v.InferOutput<typeof ReadMediaFiltersSchema>;
export type TReadMediaFiltersSchemaInput = v.InferInput<typeof ReadMediaFiltersSchema>;
