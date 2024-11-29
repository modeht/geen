import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadProductOptionValueFiltersSchema from './read-product-option-value-filters.schema';
import ReadProductOptionValueRelationsSchema from './read-product-option-value-relations.schema';
import ReadProductOptionValueOrdersSchema from './read-product-option-value-orders.schema';
const ReadProductOptionValueSchema = v.optional(v.object({
filters: v.undefinedable(ReadProductOptionValueFiltersSchema),
relations: v.undefinedable(ReadProductOptionValueRelationsSchema),
orders: v.undefinedable(ReadProductOptionValueOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadProductOptionValueSchema;
export type TReadProductOptionValueSchemaInput = v.InferInput<typeof ReadProductOptionValueSchema>;
export type TReadProductOptionValueSchemaOutput = v.InferOutput<typeof ReadProductOptionValueSchema>;
