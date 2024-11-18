import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadPreferenceRelationsSchema, ReadPreferenceRelations } from '../../preferences/generated-schemas/read-preference-relations.schema'
import { ReadCollectionRelationsSchema, ReadCollectionRelations } from '../../collections/generated-schemas/read-collection-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadCategoryRelationsSchema, ReadCategoryRelations } from '../../categories/generated-schemas/read-category-relations.schema'
import { ReadCountryRelationsSchema, ReadCountryRelations } from '../../countries/generated-schemas/read-country-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelations } from '../../products/generated-schemas/read-product-variant-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadProductReviewRelationsSchema, ReadProductReviewRelations } from '../../products/generated-schemas/read-product-review-relations.schema'



export class ReadMediaRelations {preference?: ReadPreferenceRelations | boolean | null | undefined;
collectionCover?: ReadCollectionRelations | boolean | null | undefined;
user?: ReadShopperProfileRelations | boolean | null | undefined;
story?: ReadStoryRelations | boolean | null | undefined;
brandStoreCover?: ReadBrandProfileRelations | boolean | null | undefined;
brandStoreLogo?: ReadBrandProfileRelations | boolean | null | undefined;
category?: ReadCategoryRelations | boolean | null | undefined;
country?: ReadCountryRelations | boolean | null | undefined;
postThumbnail?: ReadPostRelations | boolean | null | undefined;
product?: ReadProductRelations | boolean | null | undefined;
productVariant?: ReadProductVariantRelations | boolean | null | undefined;
message?: ReadMessageRelations | boolean | null | undefined;
post?: ReadPostRelations | boolean | null | undefined;
review?: ReadProductReviewRelations | boolean | null | undefined}

export const ReadMediaRelationsSchema: v.GenericSchema<ReadMediaRelations> = v.object({preference: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPreferenceRelationsSchema)])),
collectionCover: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCollectionRelationsSchema)])),
user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
story: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)])),
brandStoreCover: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
brandStoreLogo: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
category: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)])),
country: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCountryRelationsSchema)])),
postThumbnail: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
productVariant: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductVariantRelationsSchema)])),
message: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
review: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductReviewRelationsSchema)]))})



export type TReadMediaRelationsSchemaOutput = v.InferOutput<typeof ReadMediaRelationsSchema>;
export type TReadMediaRelationsSchemaInput = v.InferInput<typeof ReadMediaRelationsSchema>;
