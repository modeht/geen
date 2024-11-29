import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadProductOptionFiltersSchema } from './read-product-option-filters.schema';
import { ReadProductOptionRelationsSchema } from './read-product-option-relations.schema';
import { ReadProductOptionOrdersSchema } from './read-product-option-orders.schema';
const ReadProductOptionSchema = v.optional(v.object({
filters: v.undefinedable(ReadProductOptionFiltersSchema),
relations: v.undefinedable(ReadProductOptionRelationsSchema),
orders: v.undefinedable(ReadProductOptionOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadProductOptionSchema;
export type TReadProductOptionSchemaInput = v.InferInput<typeof ReadProductOptionSchema>;
export type TReadProductOptionSchemaOutput = v.InferOutput<typeof ReadProductOptionSchema>;
