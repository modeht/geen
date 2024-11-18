import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadPromotionFiltersSchema, ReadPromotionFiltersSchemaFilters } from './read-promotion-filters.schema'
import { ReadCategoryFiltersSchema, ReadCategoryFiltersSchemaFilters } from '../../categories/generated-schemas/read-category-filters.schema'

export class ReadSeasonalPromotionFiltersSchemaFilters {title?: GenericComparable<"string"> | null | undefined;
start?: GenericComparable<"date"> | null | undefined;
end?: GenericComparable<"date"> | null | undefined;
promotions?: ReadPromotionFiltersSchemaFilters | null | undefined;
subCategories?: ReadCategoryFiltersSchemaFilters | null | undefined}

export const ReadSeasonalPromotionFiltersSchema: v.GenericSchema<ReadSeasonalPromotionFiltersSchemaFilters> = v.object({title: v.nullish(comparable("string")),
start: v.nullish(comparable("date")),
end: v.nullish(comparable("date")),
promotions: v.nullish(v.lazy(() => ReadPromotionFiltersSchema)),
subCategories: v.nullish(v.lazy(() => ReadCategoryFiltersSchema))})



export type TReadSeasonalPromotionSchemaOutput = v.InferOutput<typeof ReadSeasonalPromotionFiltersSchema>;
export type TReadSeasonalPromotionSchemaInput = v.InferInput<typeof ReadSeasonalPromotionFiltersSchema>;
