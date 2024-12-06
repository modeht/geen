import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadOrderFiltersSchema from './read-order-filters.schema';
import ReadOrderRelationsSchema from './read-order-relations.schema';
import ReadOrderOrdersSchema from './read-order-orders.schema';
const ReadOrderSchema = v.optional(
	v.object({
		filters: v.optional(ReadOrderFiltersSchema),
		relations: v.optional(ReadOrderRelationsSchema),
		orders: v.optional(ReadOrderOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadOrderSchema;
export type TReadOrderSchemaInput = v.InferInput<typeof ReadOrderSchema>;
export type TReadOrderSchemaOutput = v.InferOutput<typeof ReadOrderSchema>;
