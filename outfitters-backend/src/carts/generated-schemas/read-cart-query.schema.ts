import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadCartFiltersSchema from './read-cart-filters.schema';
import ReadCartRelationsSchema from './read-cart-relations.schema';
import ReadCartOrdersSchema from './read-cart-orders.schema';
const ReadCartSchema = v.optional(
	v.object({
		filters: v.optional(ReadCartFiltersSchema),
		relations: v.optional(ReadCartRelationsSchema),
		orders: v.optional(ReadCartOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadCartSchema;
export type TReadCartSchemaInput = v.InferInput<typeof ReadCartSchema>;
export type TReadCartSchemaOutput = v.InferOutput<typeof ReadCartSchema>;
