import * as v from 'valibot';
import { ReadStoryLikesFiltersSchema } from './read-story-likes-filters.schema';
import { ReadStoryLikesRelationsSchema } from './read-story-likes-relations.schema';
export const ReadStoryLikesSchema = v.object({
filters: v.nullish(ReadStoryLikesFiltersSchema),
relations: v.nullish(ReadStoryLikesRelationsSchema),
});
export type TReadStoryLikesSchemaInput = v.InferInput<typeof ReadStoryLikesSchema>;
export type TReadStoryLikesSchemaOutput = v.InferOutput<typeof ReadStoryLikesSchema>;
