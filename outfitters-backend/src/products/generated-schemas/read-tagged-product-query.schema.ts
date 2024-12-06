import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadTaggedProductFiltersSchema from './read-tagged-product-filters.schema';
import ReadTaggedProductRelationsSchema from './read-tagged-product-relations.schema';
import ReadTaggedProductOrdersSchema from './read-tagged-product-orders.schema';
const ReadTaggedProductSchema = v.optional(
	v.object({
		filters: v.optional(ReadTaggedProductFiltersSchema),
		relations: v.optional(ReadTaggedProductRelationsSchema),
		orders: v.optional(ReadTaggedProductOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadTaggedProductSchema;
export type TReadTaggedProductSchemaInput = v.InferInput<typeof ReadTaggedProductSchema>;
export type TReadTaggedProductSchemaOutput = v.InferOutput<typeof ReadTaggedProductSchema>;
