import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadOrdersFiltersSchema from './read-orders-filters.schema';
import ReadOrdersRelationsSchema from './read-orders-relations.schema';
import ReadOrdersOrdersSchema from './read-orders-orders.schema';
const ReadOrdersSchema = v.optional(
	v.object({
		filters: v.optional(ReadOrdersFiltersSchema),
		relations: v.optional(ReadOrdersRelationsSchema),
		orders: v.optional(ReadOrdersOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadOrdersSchema;
export type TReadOrdersSchemaInput = v.InferInput<typeof ReadOrdersSchema>;
export type TReadOrdersSchemaOutput = v.InferOutput<typeof ReadOrdersSchema>;
