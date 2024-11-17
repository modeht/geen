import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadPreferenceSchema, ReadPreferenceSchemaFilters } from '../../preferences/generated-schemas/read-preference.schema'
import { ReadCollectionSchema, ReadCollectionSchemaFilters } from '../../collections/generated-schemas/read-collection.schema'
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from '../../users/generated-schemas/read-shopper-profile.schema'
import { ReadStorySchema, ReadStorySchemaFilters } from '../../stories/generated-schemas/read-story.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from '../../users/generated-schemas/read-brand-profile.schema'
import { ReadCategorySchema, ReadCategorySchemaFilters } from '../../categories/generated-schemas/read-category.schema'
import { ReadCountrySchema, ReadCountrySchemaFilters } from '../../countries/generated-schemas/read-country.schema'
import { ReadPostSchema, ReadPostSchemaFilters } from '../../posts/generated-schemas/read-post.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'
import { ReadProductVariantSchema, ReadProductVariantSchemaFilters } from '../../products/generated-schemas/read-product-variant.schema'
import { ReadMessageSchema, ReadMessageSchemaFilters } from '../../messages/generated-schemas/read-message.schema'
import { ReadProductReviewSchema, ReadProductReviewSchemaFilters } from '../../products/generated-schemas/read-product-review.schema'

export class ReadMediaSchemaFilters {preference?: ReadPreferenceSchemaFilters | null | undefined;
collectionCover?: ReadCollectionSchemaFilters | null | undefined;
user?: ReadShopperProfileSchemaFilters | null | undefined;
story?: ReadStorySchemaFilters | null | undefined;
brandStoreCover?: ReadBrandProfileSchemaFilters | null | undefined;
brandStoreLogo?: ReadBrandProfileSchemaFilters | null | undefined;
category?: ReadCategorySchemaFilters | null | undefined;
country?: ReadCountrySchemaFilters | null | undefined;
postThumbnail?: ReadPostSchemaFilters | null | undefined;
product?: ReadProductSchemaFilters | null | undefined;
productVariant?: ReadProductVariantSchemaFilters | null | undefined;
message?: ReadMessageSchemaFilters | null | undefined;
post?: ReadPostSchemaFilters | null | undefined;
review?: ReadProductReviewSchemaFilters | null | undefined;
mimetype?: GenericComparable<"string"> | null | undefined;
url?: GenericComparable<"string"> | null | undefined;
size?: GenericComparable<"number"> | null | undefined;
width?: GenericComparable<"number"> | null | undefined;
height?: GenericComparable<"number"> | null | undefined}

export const ReadMediaSchema: v.GenericSchema<ReadMediaSchemaFilters> = v.object({preference: v.nullish(v.lazy(() => ReadPreferenceSchema)),
collectionCover: v.nullish(v.lazy(() => ReadCollectionSchema)),
user: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
story: v.nullish(v.lazy(() => ReadStorySchema)),
brandStoreCover: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
brandStoreLogo: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
category: v.nullish(v.lazy(() => ReadCategorySchema)),
country: v.nullish(v.lazy(() => ReadCountrySchema)),
postThumbnail: v.nullish(v.lazy(() => ReadPostSchema)),
product: v.nullish(v.lazy(() => ReadProductSchema)),
productVariant: v.nullish(v.lazy(() => ReadProductVariantSchema)),
message: v.nullish(v.lazy(() => ReadMessageSchema)),
post: v.nullish(v.lazy(() => ReadPostSchema)),
review: v.nullish(v.lazy(() => ReadProductReviewSchema)),
mimetype: v.nullish(comparable("string")),
url: v.nullish(comparable("string")),
size: v.nullish(comparable("number")),
width: v.nullish(comparable("number")),
height: v.nullish(comparable("number"))})



export type TReadMediaSchema = v.InferOutput<typeof ReadMediaSchema>
export type TReadMediaSchemaInput = v.InferInput<typeof ReadMediaSchema>
