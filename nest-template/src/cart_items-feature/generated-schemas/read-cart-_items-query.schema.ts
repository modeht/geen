import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadCart_itemsFiltersSchema from './read-cart-_items-filters.schema';
import ReadCart_itemsRelationsSchema from './read-cart-_items-relations.schema';
import ReadCart_itemsOrdersSchema from './read-cart-_items-orders.schema';
const ReadCart_itemsSchema = v.optional(
	v.object({
		filters: v.optional(ReadCart_itemsFiltersSchema),
		relations: v.optional(ReadCart_itemsRelationsSchema),
		orders: v.optional(ReadCart_itemsOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadCart_itemsSchema;
export type TReadCart_itemsSchemaInput = v.InferInput<typeof ReadCart_itemsSchema>;
export type TReadCart_itemsSchemaOutput = v.InferOutput<typeof ReadCart_itemsSchema>;
