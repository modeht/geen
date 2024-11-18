import * as v from 'valibot';
import { ReadPostLikesFiltersSchema } from './read-post-likes-filters.schema';
import { ReadPostLikesRelationsSchema } from './read-post-likes-relations.schema';
export const ReadPostLikesSchema = v.object({
filters: v.nullish(ReadPostLikesFiltersSchema),
relations: v.nullish(ReadPostLikesRelationsSchema),
});
export type TReadPostLikesSchemaInput = v.InferInput<typeof ReadPostLikesSchema>;
export type TReadPostLikesSchemaOutput = v.InferOutput<typeof ReadPostLikesSchema>;
