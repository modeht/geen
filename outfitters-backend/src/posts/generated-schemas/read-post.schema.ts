import * as v from 'valibot';
import { ReadPostFiltersSchema } from './read-post-filters.schema';
import { ReadPostRelationsSchema } from './read-post-relations.schema';
export const ReadPostSchema = v.object({
filters: ReadPostFiltersSchema,
relations: ReadPostRelationsSchema,
});
export type TReadPostSchemaInput = v.InferInput<typeof ReadPostSchema>;
export type TReadPostSchemaOutput = v.InferOutput<typeof ReadPostSchema>;
