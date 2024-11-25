import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadCartFiltersSchema } from './read-cart-filters.schema';
import { ReadCartRelationsSchema } from './read-cart-relations.schema';
import { ReadCartOrdersSchema } from './read-cart-orders.schema';
export const ReadCartSchema = v.object({
filters: v.undefinedable(ReadCartFiltersSchema),
relations: v.undefinedable(ReadCartRelationsSchema),
orders: v.undefinedable(ReadCartOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadCartSchemaInput = v.InferInput<typeof ReadCartSchema>;
export type TReadCartSchemaOutput = v.InferOutput<typeof ReadCartSchema>;
