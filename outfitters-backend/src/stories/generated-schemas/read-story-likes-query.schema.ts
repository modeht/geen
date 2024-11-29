import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadStoryLikesFiltersSchema } from './read-story-likes-filters.schema';
import { ReadStoryLikesRelationsSchema } from './read-story-likes-relations.schema';
import { ReadStoryLikesOrdersSchema } from './read-story-likes-orders.schema';
const ReadStoryLikesSchema = v.optional(v.object({
filters: v.undefinedable(ReadStoryLikesFiltersSchema),
relations: v.undefinedable(ReadStoryLikesRelationsSchema),
orders: v.undefinedable(ReadStoryLikesOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadStoryLikesSchema;
export type TReadStoryLikesSchemaInput = v.InferInput<typeof ReadStoryLikesSchema>;
export type TReadStoryLikesSchemaOutput = v.InferOutput<typeof ReadStoryLikesSchema>;
