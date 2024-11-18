import * as v from 'valibot';
import { ReadPromotionFiltersSchema } from './read-promotion-filters.schema';
import { ReadPromotionRelationsSchema } from './read-promotion-relations.schema';
export const ReadPromotionSchema = v.object({
filters: ReadPromotionFiltersSchema,
relations: ReadPromotionRelationsSchema,
});
export type TReadPromotionSchemaInput = v.InferInput<typeof ReadPromotionSchema>;
export type TReadPromotionSchemaOutput = v.InferOutput<typeof ReadPromotionSchema>;
