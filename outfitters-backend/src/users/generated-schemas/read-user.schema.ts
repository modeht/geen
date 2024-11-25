import * as v from 'valibot';
import { ReadUserFiltersSchema } from './read-user-filters.schema';
import { ReadUserRelationsSchema } from './read-user-relations.schema';
import { ReadUserOrdersSchema } from './read-user-orders.schema';
export const ReadUserSchema = v.object({
filters: v.undefinedable(ReadUserFiltersSchema),
relations: v.undefinedable(ReadUserRelationsSchema),
orders: v.undefinedable(ReadUserOrdersSchema),
});
export type TReadUserSchemaInput = v.InferInput<typeof ReadUserSchema>;
export type TReadUserSchemaOutput = v.InferOutput<typeof ReadUserSchema>;
