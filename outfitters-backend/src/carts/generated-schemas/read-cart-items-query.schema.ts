import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadCartItemsFiltersSchema from './read-cart-items-filters.schema';
import ReadCartItemsRelationsSchema from './read-cart-items-relations.schema';
import ReadCartItemsOrdersSchema from './read-cart-items-orders.schema';
const ReadCartItemsSchema = v.optional(
	v.object({
		filters: v.optional(ReadCartItemsFiltersSchema),
		relations: v.optional(ReadCartItemsRelationsSchema),
		orders: v.optional(ReadCartItemsOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadCartItemsSchema;
export type TReadCartItemsSchemaInput = v.InferInput<typeof ReadCartItemsSchema>;
export type TReadCartItemsSchemaOutput = v.InferOutput<typeof ReadCartItemsSchema>;
