import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadPostFiltersSchema from './read-post-filters.schema';
import ReadPostRelationsSchema from './read-post-relations.schema';
import ReadPostOrdersSchema from './read-post-orders.schema';
const ReadPostSchema = v.optional(v.object({
filters: v.optional(ReadPostFiltersSchema),
relations: v.optional(ReadPostRelationsSchema),
orders: v.optional(ReadPostOrdersSchema),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));
export default ReadPostSchema;
export type TReadPostSchemaInput = v.InferInput<typeof ReadPostSchema>;
export type TReadPostSchemaOutput = v.InferOutput<typeof ReadPostSchema>;
