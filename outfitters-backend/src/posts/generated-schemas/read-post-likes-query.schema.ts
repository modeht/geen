import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadPostLikesFiltersSchema from './read-post-likes-filters.schema';
import ReadPostLikesRelationsSchema from './read-post-likes-relations.schema';
import ReadPostLikesOrdersSchema from './read-post-likes-orders.schema';
const ReadPostLikesSchema = v.optional(v.object({
filters: v.optional(ReadPostLikesFiltersSchema),
relations: v.optional(ReadPostLikesRelationsSchema),
orders: v.optional(ReadPostLikesOrdersSchema),
pagination: v.optional(ReadPaginationSchema),
}));
export default ReadPostLikesSchema;
export type TReadPostLikesSchemaInput = v.InferInput<typeof ReadPostLikesSchema>;
export type TReadPostLikesSchemaOutput = v.InferOutput<typeof ReadPostLikesSchema>;
