import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadPreferenceFiltersSchema, ReadPreferenceFiltersSchemaFilters } from '../../preferences/generated-schemas/read-preference-filters.schema'
import { ReadCollectionFiltersSchema, ReadCollectionFiltersSchemaFilters } from '../../collections/generated-schemas/read-collection-filters.schema'
import { ReadShopperProfileFiltersSchema, ReadShopperProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-shopper-profile-filters.schema'
import { ReadStoryFiltersSchema, ReadStoryFiltersSchemaFilters } from '../../stories/generated-schemas/read-story-filters.schema'
import { ReadBrandProfileFiltersSchema, ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'
import { ReadCategoryFiltersSchema, ReadCategoryFiltersSchemaFilters } from '../../categories/generated-schemas/read-category-filters.schema'
import { ReadCountryFiltersSchema, ReadCountryFiltersSchemaFilters } from '../../countries/generated-schemas/read-country-filters.schema'
import { ReadPostFiltersSchema, ReadPostFiltersSchemaFilters } from '../../posts/generated-schemas/read-post-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'
import { ReadProductVariantFiltersSchema, ReadProductVariantFiltersSchemaFilters } from '../../products/generated-schemas/read-product-variant-filters.schema'
import { ReadMessageFiltersSchema, ReadMessageFiltersSchemaFilters } from '../../messages/generated-schemas/read-message-filters.schema'
import { ReadProductReviewFiltersSchema, ReadProductReviewFiltersSchemaFilters } from '../../products/generated-schemas/read-product-review-filters.schema'

export class ReadMediaFiltersSchemaFilters {preference?: ReadPreferenceFiltersSchemaFilters | null | undefined;
collectionCover?: ReadCollectionFiltersSchemaFilters | null | undefined;
user?: ReadShopperProfileFiltersSchemaFilters | null | undefined;
story?: ReadStoryFiltersSchemaFilters | null | undefined;
brandStoreCover?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
brandStoreLogo?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
category?: ReadCategoryFiltersSchemaFilters | null | undefined;
country?: ReadCountryFiltersSchemaFilters | null | undefined;
postThumbnail?: ReadPostFiltersSchemaFilters | null | undefined;
product?: ReadProductFiltersSchemaFilters | null | undefined;
productVariant?: ReadProductVariantFiltersSchemaFilters | null | undefined;
message?: ReadMessageFiltersSchemaFilters | null | undefined;
post?: ReadPostFiltersSchemaFilters | null | undefined;
review?: ReadProductReviewFiltersSchemaFilters | null | undefined;
mimetype?: GenericComparable<"string"> | null | undefined;
url?: GenericComparable<"string"> | null | undefined;
size?: GenericComparable<"number"> | null | undefined;
width?: GenericComparable<"number"> | null | undefined;
height?: GenericComparable<"number"> | null | undefined}

export const ReadMediaFiltersSchema: v.GenericSchema<ReadMediaFiltersSchemaFilters> = v.object({preference: v.nullish(v.lazy(() => ReadPreferenceFiltersSchema)),
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
mimetype: v.nullish(comparable("string")),
url: v.nullish(comparable("string")),
size: v.nullish(comparable("number")),
width: v.nullish(comparable("number")),
height: v.nullish(comparable("number"))})



export type TReadMediaSchemaOutput = v.InferOutput<typeof ReadMediaFiltersSchema>;
export type TReadMediaSchemaInput = v.InferInput<typeof ReadMediaFiltersSchema>;
