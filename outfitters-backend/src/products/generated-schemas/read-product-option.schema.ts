import * as v from 'valibot';
import { ReadProductOptionFiltersSchema } from './read-product-option-filters.schema';
import { ReadProductOptionRelationsSchema } from './read-product-option-relations.schema';
import { ReadProductOptionOrdersSchema } from './read-product-option-orders.schema';
export const ReadProductOptionSchema = v.object({
filters: v.undefinedable(ReadProductOptionFiltersSchema),
relations: v.undefinedable(ReadProductOptionRelationsSchema),
orders: v.undefinedable(ReadProductOptionOrdersSchema),
});
export type TReadProductOptionSchemaInput = v.InferInput<typeof ReadProductOptionSchema>;
export type TReadProductOptionSchemaOutput = v.InferOutput<typeof ReadProductOptionSchema>;
