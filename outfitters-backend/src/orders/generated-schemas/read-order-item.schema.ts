import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadOrderItemFiltersSchema } from './read-order-item-filters.schema';
import { ReadOrderItemRelationsSchema } from './read-order-item-relations.schema';
import { ReadOrderItemOrdersSchema } from './read-order-item-orders.schema';
export const ReadOrderItemSchema = v.object({
filters: v.undefinedable(ReadOrderItemFiltersSchema),
relations: v.undefinedable(ReadOrderItemRelationsSchema),
orders: v.undefinedable(ReadOrderItemOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadOrderItemSchemaInput = v.InferInput<typeof ReadOrderItemSchema>;
export type TReadOrderItemSchemaOutput = v.InferOutput<typeof ReadOrderItemSchema>;
