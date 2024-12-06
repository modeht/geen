import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadOrderItemFiltersSchema from './read-order-item-filters.schema';
import ReadOrderItemRelationsSchema from './read-order-item-relations.schema';
import ReadOrderItemOrdersSchema from './read-order-item-orders.schema';
const ReadOrderItemSchema = v.optional(
	v.object({
		filters: v.optional(ReadOrderItemFiltersSchema),
		relations: v.optional(ReadOrderItemRelationsSchema),
		orders: v.optional(ReadOrderItemOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadOrderItemSchema;
export type TReadOrderItemSchemaInput = v.InferInput<typeof ReadOrderItemSchema>;
export type TReadOrderItemSchemaOutput = v.InferOutput<typeof ReadOrderItemSchema>;
