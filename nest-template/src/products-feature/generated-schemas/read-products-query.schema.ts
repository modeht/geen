import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadProductsFiltersSchema from './read-products-filters.schema';
import ReadProductsRelationsSchema from './read-products-relations.schema';
import ReadProductsOrdersSchema from './read-products-orders.schema';
const ReadProductsSchema = v.optional(
	v.object({
		filters: v.optional(ReadProductsFiltersSchema),
		relations: v.optional(ReadProductsRelationsSchema),
		orders: v.optional(ReadProductsOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadProductsSchema;
export type TReadProductsSchemaInput = v.InferInput<typeof ReadProductsSchema>;
export type TReadProductsSchemaOutput = v.InferOutput<typeof ReadProductsSchema>;
