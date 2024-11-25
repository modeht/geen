import * as v from 'valibot';
import { ReadCartFiltersSchema } from './read-cart-filters.schema';
import { ReadCartRelationsSchema } from './read-cart-relations.schema';
import { ReadCartOrdersSchema } from './read-cart-orders.schema';
export const ReadCartSchema = v.object({
filters: v.undefinedable(ReadCartFiltersSchema),
relations: v.undefinedable(ReadCartRelationsSchema),
orders: v.undefinedable(ReadCartOrdersSchema),
});
export type TReadCartSchemaInput = v.InferInput<typeof ReadCartSchema>;
export type TReadCartSchemaOutput = v.InferOutput<typeof ReadCartSchema>;
