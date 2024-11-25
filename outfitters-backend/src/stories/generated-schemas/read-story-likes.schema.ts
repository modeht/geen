import * as v from 'valibot';
import { ReadStoryLikesFiltersSchema } from './read-story-likes-filters.schema';
import { ReadStoryLikesRelationsSchema } from './read-story-likes-relations.schema';
import { ReadStoryLikesOrdersSchema } from './read-story-likes-orders.schema';
export const ReadStoryLikesSchema = v.object({
filters: v.undefinedable(ReadStoryLikesFiltersSchema),
relations: v.undefinedable(ReadStoryLikesRelationsSchema),
orders: v.undefinedable(ReadStoryLikesOrdersSchema),
});
export type TReadStoryLikesSchemaInput = v.InferInput<typeof ReadStoryLikesSchema>;
export type TReadStoryLikesSchemaOutput = v.InferOutput<typeof ReadStoryLikesSchema>;
