import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadUserFiltersSchema from './read-user-filters.schema';
import ReadUserRelationsSchema from './read-user-relations.schema';
import ReadUserOrdersSchema from './read-user-orders.schema';
const ReadUserSchema = v.optional(v.object({
filters: v.optional(ReadUserFiltersSchema),
relations: v.optional(ReadUserRelationsSchema),
orders: v.optional(ReadUserOrdersSchema),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));
export default ReadUserSchema;
export type TReadUserSchemaInput = v.InferInput<typeof ReadUserSchema>;
export type TReadUserSchemaOutput = v.InferOutput<typeof ReadUserSchema>;
