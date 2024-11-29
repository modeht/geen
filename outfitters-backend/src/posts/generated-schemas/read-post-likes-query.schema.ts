import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadPostLikesFiltersSchema } from './read-post-likes-filters.schema';
import { ReadPostLikesRelationsSchema } from './read-post-likes-relations.schema';
import { ReadPostLikesOrdersSchema } from './read-post-likes-orders.schema';
const ReadPostLikesSchema = v.optional(v.object({
filters: v.undefinedable(ReadPostLikesFiltersSchema),
relations: v.undefinedable(ReadPostLikesRelationsSchema),
orders: v.undefinedable(ReadPostLikesOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadPostLikesSchema;
export type TReadPostLikesSchemaInput = v.InferInput<typeof ReadPostLikesSchema>;
export type TReadPostLikesSchemaOutput = v.InferOutput<typeof ReadPostLikesSchema>;
