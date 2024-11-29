import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadUserFiltersSchema } from './read-user-filters.schema';
import { ReadUserRelationsSchema } from './read-user-relations.schema';
import { ReadUserOrdersSchema } from './read-user-orders.schema';
const ReadUserSchema = v.optional(v.object({
filters: v.undefinedable(ReadUserFiltersSchema),
relations: v.undefinedable(ReadUserRelationsSchema),
orders: v.undefinedable(ReadUserOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadUserSchema;
export type TReadUserSchemaInput = v.InferInput<typeof ReadUserSchema>;
export type TReadUserSchemaOutput = v.InferOutput<typeof ReadUserSchema>;
