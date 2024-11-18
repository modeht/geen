import * as v from 'valibot';
import { ReadPreferenceFiltersSchema } from './read-preference-filters.schema';
import { ReadPreferenceRelationsSchema } from './read-preference-relations.schema';
export const ReadPreferenceSchema = v.object({
filters: v.nullish(ReadPreferenceFiltersSchema),
relations: v.nullish(ReadPreferenceRelationsSchema),
});
export type TReadPreferenceSchemaInput = v.InferInput<typeof ReadPreferenceSchema>;
export type TReadPreferenceSchemaOutput = v.InferOutput<typeof ReadPreferenceSchema>;
