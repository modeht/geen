import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadSeasonalPromotionRelationsSchema, ReadSeasonalPromotionRelations } from '../../promotions/generated-schemas/read-seasonal-promotion-relations.schema'



export class ReadCategoryRelations {media?: ReadMediaRelations | string | boolean | undefined;
subCategories?: ReadCategoryRelations | string | boolean | undefined;
superCategory?: ReadCategoryRelations | string | boolean | undefined;
products?: ReadProductRelations | string | boolean | undefined;
categorybrandProfiles?: ReadBrandProfileRelations | string | boolean | undefined;
subCategoriesBrandProfiles?: ReadBrandProfileRelations | string | boolean | undefined;
seasonalPromotions?: ReadSeasonalPromotionRelations | string | boolean | undefined}

export const ReadCategoryRelationsSchema: v.GenericSchema<ReadCategoryRelations> = v.object({media: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
subCategories: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCategoryRelationsSchema)])),
superCategory: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCategoryRelationsSchema)])),
products: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)])),
categorybrandProfiles: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
subCategoriesBrandProfiles: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
seasonalPromotions: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadSeasonalPromotionRelationsSchema)]))})



export type TReadCategoryRelationsSchemaOutput = v.InferOutput<typeof ReadCategoryRelationsSchema>;
export type TReadCategoryRelationsSchemaInput = v.InferInput<typeof ReadCategoryRelationsSchema>;
