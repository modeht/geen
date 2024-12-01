import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadProductFiltersSchema from './read-product-filters.schema';
import ReadProductRelationsSchema from './read-product-relations.schema';
import ReadProductOrdersSchema from './read-product-orders.schema';
const ReadProductSchema = v.optional(v.object({
filters: v.undefinedable(ReadProductFiltersSchema),
relations: v.undefinedable(ReadProductRelationsSchema),
orders: v.undefinedable(ReadProductOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadProductSchema;
export type TReadProductSchemaInput = v.InferInput<typeof ReadProductSchema>;
export type TReadProductSchemaOutput = v.InferOutput<typeof ReadProductSchema>;