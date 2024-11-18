import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadSeasonalPromotionRelationsSchema, ReadSeasonalPromotionRelations } from '../../promotions/generated-schemas/read-seasonal-promotion-relations.schema'



export class ReadCategoryRelations {media?: ReadMediaRelations | boolean | null | undefined;
subCategories?: ReadCategoryRelations | boolean | null | undefined;
superCategory?: ReadCategoryRelations | boolean | null | undefined;
products?: ReadProductRelations | boolean | null | undefined;
categorybrandProfiles?: ReadBrandProfileRelations | boolean | null | undefined;
subCategoriesBrandProfiles?: ReadBrandProfileRelations | boolean | null | undefined;
seasonalPromotions?: ReadSeasonalPromotionRelations | boolean | null | undefined}

export const ReadCategoryRelationsSchema: v.GenericSchema<ReadCategoryRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
subCategories: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)])),
superCategory: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)])),
products: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
categorybrandProfiles: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
subCategoriesBrandProfiles: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
seasonalPromotions: v.nullish(v.union([v.boolean(), v.lazy(() => ReadSeasonalPromotionRelationsSchema)]))})



export type TReadCategoryRelationsSchemaOutput = v.InferOutput<typeof ReadCategoryRelationsSchema>;
export type TReadCategoryRelationsSchemaInput = v.InferInput<typeof ReadCategoryRelationsSchema>;
