import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadOrderFiltersSchema } from './read-order-filters.schema';
import { ReadOrderRelationsSchema } from './read-order-relations.schema';
import { ReadOrderOrdersSchema } from './read-order-orders.schema';
export const ReadOrderSchema = v.object({
filters: v.undefinedable(ReadOrderFiltersSchema),
relations: v.undefinedable(ReadOrderRelationsSchema),
orders: v.undefinedable(ReadOrderOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadOrderSchemaInput = v.InferInput<typeof ReadOrderSchema>;
export type TReadOrderSchemaOutput = v.InferOutput<typeof ReadOrderSchema>;
