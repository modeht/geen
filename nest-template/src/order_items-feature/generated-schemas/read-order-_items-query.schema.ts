import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadOrder_itemsFiltersSchema from './read-order-_items-filters.schema';
import ReadOrder_itemsRelationsSchema from './read-order-_items-relations.schema';
import ReadOrder_itemsOrdersSchema from './read-order-_items-orders.schema';
const ReadOrder_itemsSchema = v.optional(
	v.object({
		filters: v.optional(ReadOrder_itemsFiltersSchema),
		relations: v.optional(ReadOrder_itemsRelationsSchema),
		orders: v.optional(ReadOrder_itemsOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadOrder_itemsSchema;
export type TReadOrder_itemsSchemaInput = v.InferInput<typeof ReadOrder_itemsSchema>;
export type TReadOrder_itemsSchemaOutput = v.InferOutput<typeof ReadOrder_itemsSchema>;
