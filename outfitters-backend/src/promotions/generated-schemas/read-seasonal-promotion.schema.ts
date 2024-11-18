import * as v from 'valibot';
import { ReadSeasonalPromotionFiltersSchema } from './read-seasonal-promotion-filters.schema';
import { ReadSeasonalPromotionRelationsSchema } from './read-seasonal-promotion-relations.schema';
export const ReadSeasonalPromotionSchema = v.object({
filters: v.nullish(ReadSeasonalPromotionFiltersSchema),
relations: v.nullish(ReadSeasonalPromotionRelationsSchema),
});
export type TReadSeasonalPromotionSchemaInput = v.InferInput<typeof ReadSeasonalPromotionSchema>;
export type TReadSeasonalPromotionSchemaOutput = v.InferOutput<typeof ReadSeasonalPromotionSchema>;
