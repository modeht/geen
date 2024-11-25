import * as v from 'valibot';
import { ReadPostFiltersSchema } from './read-post-filters.schema';
import { ReadPostRelationsSchema } from './read-post-relations.schema';
import { ReadPostOrdersSchema } from './read-post-orders.schema';
export const ReadPostSchema = v.object({
filters: v.undefinedable(ReadPostFiltersSchema),
relations: v.undefinedable(ReadPostRelationsSchema),
orders: v.undefinedable(ReadPostOrdersSchema),
});
export type TReadPostSchemaInput = v.InferInput<typeof ReadPostSchema>;
export type TReadPostSchemaOutput = v.InferOutput<typeof ReadPostSchema>;
