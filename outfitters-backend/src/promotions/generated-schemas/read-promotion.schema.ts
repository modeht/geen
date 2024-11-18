import * as v from 'valibot';
import { ReadPromotionFiltersSchema } from './read-promotion-filters.schema';
import { ReadPromotionRelationsSchema } from './read-promotion-relations.schema';
export const ReadPromotionSchema = v.object({
filters: v.nullish(ReadPromotionFiltersSchema),
relations: v.nullish(ReadPromotionRelationsSchema),
});
export type TReadPromotionSchemaInput = v.InferInput<typeof ReadPromotionSchema>;
export type TReadPromotionSchemaOutput = v.InferOutput<typeof ReadPromotionSchema>;
