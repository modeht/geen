import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadPromotionFiltersSchema } from './read-promotion-filters.schema';
import { ReadPromotionRelationsSchema } from './read-promotion-relations.schema';
import { ReadPromotionOrdersSchema } from './read-promotion-orders.schema';
export const ReadPromotionSchema = v.object({
filters: v.undefinedable(ReadPromotionFiltersSchema),
relations: v.undefinedable(ReadPromotionRelationsSchema),
orders: v.undefinedable(ReadPromotionOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
});
export type TReadPromotionSchemaInput = v.InferInput<typeof ReadPromotionSchema>;
export type TReadPromotionSchemaOutput = v.InferOutput<typeof ReadPromotionSchema>;
