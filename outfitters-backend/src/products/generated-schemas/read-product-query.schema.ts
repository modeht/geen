import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadProductFiltersSchema from './read-product-filters.schema';
import ReadProductRelationsSchema from './read-product-relations.schema';
import ReadProductOrdersSchema from './read-product-orders.schema';
const ReadProductSchema = v.optional(v.object({
filters: v.optional(ReadProductFiltersSchema),
relations: v.optional(ReadProductRelationsSchema),
orders: v.optional(ReadProductOrdersSchema),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));
export default ReadProductSchema;
export type TReadProductSchemaInput = v.InferInput<typeof ReadProductSchema>;
export type TReadProductSchemaOutput = v.InferOutput<typeof ReadProductSchema>;
