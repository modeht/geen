import * as v from 'valibot';
import { ReadBrandOrderFiltersSchema } from './read-brand-order-filters.schema';
import { ReadBrandOrderRelationsSchema } from './read-brand-order-relations.schema';
import { ReadBrandOrderOrdersSchema } from './read-brand-order-orders.schema';
export const ReadBrandOrderSchema = v.object({
filters: v.undefinedable(ReadBrandOrderFiltersSchema),
relations: v.undefinedable(ReadBrandOrderRelationsSchema),
orders: v.undefinedable(ReadBrandOrderOrdersSchema),
});
export type TReadBrandOrderSchemaInput = v.InferInput<typeof ReadBrandOrderSchema>;
export type TReadBrandOrderSchemaOutput = v.InferOutput<typeof ReadBrandOrderSchema>;
