import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadCartItemsFiltersSchema } from './read-cart-items-filters.schema';
import { ReadCartItemsRelationsSchema } from './read-cart-items-relations.schema';
import { ReadCartItemsOrdersSchema } from './read-cart-items-orders.schema';
export const ReadCartItemsSchema = v.object({
filters: v.undefinedable(ReadCartItemsFiltersSchema),
relations: v.undefinedable(ReadCartItemsRelationsSchema),
orders: v.undefinedable(ReadCartItemsOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadCartItemsSchemaInput = v.InferInput<typeof ReadCartItemsSchema>;
export type TReadCartItemsSchemaOutput = v.InferOutput<typeof ReadCartItemsSchema>;
