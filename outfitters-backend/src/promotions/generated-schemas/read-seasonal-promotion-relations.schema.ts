import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadPromotionRelationsSchema, ReadPromotionRelations } from './read-promotion-relations.schema'
import { ReadCategoryRelationsSchema, ReadCategoryRelations } from '../../categories/generated-schemas/read-category-relations.schema'


import { PromotionStatusEnum } from '../entities/enums'
export class ReadSeasonalPromotionRelations {status?: PromotionStatusEnum | null | undefined;
promotions?: ReadPromotionRelations | boolean | null | undefined;
subCategories?: ReadCategoryRelations | boolean | null | undefined}

export const ReadSeasonalPromotionRelationsSchema: v.GenericSchema<ReadSeasonalPromotionRelations> = v.object({status: v.nullish(v.enum(PromotionStatusEnum)),
promotions: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromotionRelationsSchema)])),
subCategories: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)]))})



export type TReadSeasonalPromotionRelationsSchemaOutput = v.InferOutput<typeof ReadSeasonalPromotionRelationsSchema>;
export type TReadSeasonalPromotionRelationsSchemaInput = v.InferInput<typeof ReadSeasonalPromotionRelationsSchema>;
