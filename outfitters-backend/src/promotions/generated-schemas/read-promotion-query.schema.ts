import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadPromotionFiltersSchema from './read-promotion-filters.schema';
import ReadPromotionRelationsSchema from './read-promotion-relations.schema';
import ReadPromotionOrdersSchema from './read-promotion-orders.schema';
const ReadPromotionSchema = v.optional(v.object({
filters: v.optional(ReadPromotionFiltersSchema),
relations: v.optional(ReadPromotionRelationsSchema),
orders: v.optional(ReadPromotionOrdersSchema),
pagination: v.optional(ReadPaginationSchema),
}));
export default ReadPromotionSchema;
export type TReadPromotionSchemaInput = v.InferInput<typeof ReadPromotionSchema>;
export type TReadPromotionSchemaOutput = v.InferOutput<typeof ReadPromotionSchema>;
