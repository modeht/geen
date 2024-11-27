import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadTaggedProductFiltersSchema } from './read-tagged-product-filters.schema';
import { ReadTaggedProductRelationsSchema } from './read-tagged-product-relations.schema';
import { ReadTaggedProductOrdersSchema } from './read-tagged-product-orders.schema';
export const ReadTaggedProductSchema = v.object({
filters: v.undefinedable(ReadTaggedProductFiltersSchema),
relations: v.undefinedable(ReadTaggedProductRelationsSchema),
orders: v.undefinedable(ReadTaggedProductOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
});
export type TReadTaggedProductSchemaInput = v.InferInput<typeof ReadTaggedProductSchema>;
export type TReadTaggedProductSchemaOutput = v.InferOutput<typeof ReadTaggedProductSchema>;
