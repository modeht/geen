import * as v from 'valibot';
import { ReadStoryFiltersSchema } from './read-story-filters.schema';
import { ReadStoryRelationsSchema } from './read-story-relations.schema';
export const ReadStorySchema = v.object({
filters: v.nullish(ReadStoryFiltersSchema),
relations: v.nullish(ReadStoryRelationsSchema),
});
export type TReadStorySchemaInput = v.InferInput<typeof ReadStorySchema>;
export type TReadStorySchemaOutput = v.InferOutput<typeof ReadStorySchema>;
