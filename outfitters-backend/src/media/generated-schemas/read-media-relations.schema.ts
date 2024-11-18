import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadPreferenceRelationsSchema, ReadPreferenceRelationsSchemaRelations } from '../../preferences/generated-schemas/read-preference-relations.schema'
import { ReadCollectionRelationsSchema, ReadCollectionRelationsSchemaRelations } from '../../collections/generated-schemas/read-collection-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelationsSchemaRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadCategoryRelationsSchema, ReadCategoryRelationsSchemaRelations } from '../../categories/generated-schemas/read-category-relations.schema'
import { ReadCountryRelationsSchema, ReadCountryRelationsSchemaRelations } from '../../countries/generated-schemas/read-country-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelationsSchemaRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelationsSchemaRelations } from '../../products/generated-schemas/read-product-variant-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelationsSchemaRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadProductReviewRelationsSchema, ReadProductReviewRelationsSchemaRelations } from '../../products/generated-schemas/read-product-review-relations.schema'

export class ReadMediaRelationsSchemaRelations {preference?: ReadPreferenceRelationsSchemaRelations | boolean | null | undefined;
collectionCover?: ReadCollectionRelationsSchemaRelations | boolean | null | undefined;
user?: ReadShopperProfileRelationsSchemaRelations | boolean | null | undefined;
story?: ReadStoryRelationsSchemaRelations | boolean | null | undefined;
brandStoreCover?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
brandStoreLogo?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
category?: ReadCategoryRelationsSchemaRelations | boolean | null | undefined;
country?: ReadCountryRelationsSchemaRelations | boolean | null | undefined;
postThumbnail?: ReadPostRelationsSchemaRelations | boolean | null | undefined;
product?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
productVariant?: ReadProductVariantRelationsSchemaRelations | boolean | null | undefined;
message?: ReadMessageRelationsSchemaRelations | boolean | null | undefined;
post?: ReadPostRelationsSchemaRelations | boolean | null | undefined;
review?: ReadProductReviewRelationsSchemaRelations | boolean | null | undefined}

export const ReadMediaRelationsSchema: v.GenericSchema<ReadMediaRelationsSchemaRelations> = v.object({preference: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPreferenceRelationsSchema)])),
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



export type TReadMediaRelationsSchema = v.InferOutput<typeof ReadMediaRelationsSchema>;

export type TReadMediaRelationsSchemaInput = v.InferInput<typeof ReadMediaRelationsSchema>;
