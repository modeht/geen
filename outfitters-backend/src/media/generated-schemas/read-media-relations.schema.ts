import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadPreferenceRelationsSchema, { ReadPreferenceRelations } from '../../preferences/generated-schemas/read-preference-relations.schema'
import ReadCollectionRelationsSchema, { ReadCollectionRelations } from '../../collections/generated-schemas/read-collection-relations.schema'
import ReadShopperProfileRelationsSchema, { ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import ReadStoryRelationsSchema, { ReadStoryRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import ReadBrandProfileRelationsSchema, { ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import ReadCategoryRelationsSchema, { ReadCategoryRelations } from '../../categories/generated-schemas/read-category-relations.schema'
import ReadCountryRelationsSchema, { ReadCountryRelations } from '../../countries/generated-schemas/read-country-relations.schema'
import ReadPostRelationsSchema, { ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import ReadProductRelationsSchema, { ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import ReadProductVariantRelationsSchema, { ReadProductVariantRelations } from '../../products/generated-schemas/read-product-variant-relations.schema'
import ReadMessageRelationsSchema, { ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import ReadProductReviewRelationsSchema, { ReadProductReviewRelations } from '../../products/generated-schemas/read-product-review-relations.schema'



export class ReadMediaRelations {preference?: ReadPreferenceRelations | string | boolean;
collectionCover?: ReadCollectionRelations | string | boolean;
user?: ReadShopperProfileRelations | string | boolean;
story?: ReadStoryRelations | string | boolean;
brandStoreCover?: ReadBrandProfileRelations | string | boolean;
brandStoreLogo?: ReadBrandProfileRelations | string | boolean;
category?: ReadCategoryRelations | string | boolean;
country?: ReadCountryRelations | string | boolean;
postThumbnail?: ReadPostRelations | string | boolean;
product?: ReadProductRelations | string | boolean;
productVariant?: ReadProductVariantRelations | string | boolean;
message?: ReadMessageRelations | string | boolean;
post?: ReadPostRelations | string | boolean;
review?: ReadProductReviewRelations | string | boolean}

const ReadMediaRelationsSchema: v.GenericSchema<ReadMediaRelations> = v.object({preference: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPreferenceRelationsSchema)])),
collectionCover: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCollectionRelationsSchema)])),
user: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadShopperProfileRelationsSchema)])),
story: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryRelationsSchema)])),
brandStoreCover: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
brandStoreLogo: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
category: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCategoryRelationsSchema)])),
country: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCountryRelationsSchema)])),
postThumbnail: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)])),
product: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)])),
productVariant: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductVariantRelationsSchema)])),
message: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)])),
post: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)])),
review: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductReviewRelationsSchema)]))});

export default ReadMediaRelationsSchema;




export type TReadMediaRelationsSchemaOutput = v.InferOutput<typeof ReadMediaRelationsSchema>;
export type TReadMediaRelationsSchemaInput = v.InferInput<typeof ReadMediaRelationsSchema>;
