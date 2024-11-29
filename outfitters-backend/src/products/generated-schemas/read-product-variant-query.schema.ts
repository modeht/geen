import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadProductVariantFiltersSchema } from './read-product-variant-filters.schema';
import { ReadProductVariantRelationsSchema } from './read-product-variant-relations.schema';
import { ReadProductVariantOrdersSchema } from './read-product-variant-orders.schema';
const ReadProductVariantSchema = v.optional(v.object({
filters: v.undefinedable(ReadProductVariantFiltersSchema),
relations: v.undefinedable(ReadProductVariantRelationsSchema),
orders: v.undefinedable(ReadProductVariantOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadProductVariantSchema;
export type TReadProductVariantSchemaInput = v.InferInput<typeof ReadProductVariantSchema>;
export type TReadProductVariantSchemaOutput = v.InferOutput<typeof ReadProductVariantSchema>;
