import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadBrandOrderFiltersSchema } from './read-brand-order-filters.schema';
import { ReadBrandOrderRelationsSchema } from './read-brand-order-relations.schema';
import { ReadBrandOrderOrdersSchema } from './read-brand-order-orders.schema';
export const ReadBrandOrderSchema = v.object({
filters: v.undefinedable(ReadBrandOrderFiltersSchema),
relations: v.undefinedable(ReadBrandOrderRelationsSchema),
orders: v.undefinedable(ReadBrandOrderOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadBrandOrderSchemaInput = v.InferInput<typeof ReadBrandOrderSchema>;
export type TReadBrandOrderSchemaOutput = v.InferOutput<typeof ReadBrandOrderSchema>;
