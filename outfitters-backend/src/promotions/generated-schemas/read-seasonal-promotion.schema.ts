import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadPromotionSchema, ReadPromotionSchemaFilters } from './read-promotion.schema'
import { ReadCategorySchema, ReadCategorySchemaFilters } from '../../categories/generated-schemas/read-category.schema'

export class ReadSeasonalPromotionSchemaFilters {title?: GenericComparable<"string"> | null | undefined;
start?: GenericComparable<"date"> | null | undefined;
end?: GenericComparable<"date"> | null | undefined;
promotions?: ReadPromotionSchemaFilters | null | undefined;
subCategories?: ReadCategorySchemaFilters | null | undefined}

export const ReadSeasonalPromotionSchema: v.GenericSchema<ReadSeasonalPromotionSchemaFilters> = v.object({title: v.nullish(comparable("string")),
start: v.nullish(comparable("date")),
end: v.nullish(comparable("date")),
promotions: v.nullish(v.lazy(() => ReadPromotionSchema)),
subCategories: v.nullish(v.lazy(() => ReadCategorySchema))})



export type TReadSeasonalPromotionSchema = v.InferOutput<typeof ReadSeasonalPromotionSchema>
export type TReadSeasonalPromotionSchemaInput = v.InferInput<typeof ReadSeasonalPromotionSchema>
