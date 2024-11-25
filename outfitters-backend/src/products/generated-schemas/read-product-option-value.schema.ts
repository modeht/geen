import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadProductOptionValueFiltersSchema } from './read-product-option-value-filters.schema';
import { ReadProductOptionValueRelationsSchema } from './read-product-option-value-relations.schema';
import { ReadProductOptionValueOrdersSchema } from './read-product-option-value-orders.schema';
export const ReadProductOptionValueSchema = v.object({
filters: v.undefinedable(ReadProductOptionValueFiltersSchema),
relations: v.undefinedable(ReadProductOptionValueRelationsSchema),
orders: v.undefinedable(ReadProductOptionValueOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadProductOptionValueSchemaInput = v.InferInput<typeof ReadProductOptionValueSchema>;
export type TReadProductOptionValueSchemaOutput = v.InferOutput<typeof ReadProductOptionValueSchema>;
