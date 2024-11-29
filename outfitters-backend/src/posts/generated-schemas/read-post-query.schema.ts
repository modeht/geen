import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadPostFiltersSchema } from './read-post-filters.schema';
import { ReadPostRelationsSchema } from './read-post-relations.schema';
import { ReadPostOrdersSchema } from './read-post-orders.schema';
const ReadPostSchema = v.optional(v.object({
filters: v.undefinedable(ReadPostFiltersSchema),
relations: v.undefinedable(ReadPostRelationsSchema),
orders: v.undefinedable(ReadPostOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadPostSchema;
export type TReadPostSchemaInput = v.InferInput<typeof ReadPostSchema>;
export type TReadPostSchemaOutput = v.InferOutput<typeof ReadPostSchema>;
