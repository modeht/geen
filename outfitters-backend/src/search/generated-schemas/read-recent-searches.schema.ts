import * as v from 'valibot';
import { ReadRecentSearchesFiltersSchema } from './read-recent-searches-filters.schema';
import { ReadRecentSearchesRelationsSchema } from './read-recent-searches-relations.schema';
export const ReadRecentSearchesSchema = v.object({
filters: ReadRecentSearchesFiltersSchema,
relations: ReadRecentSearchesRelationsSchema,
});
export type TReadRecentSearchesSchemaInput = v.InferInput<typeof ReadRecentSearchesSchema>;
export type TReadRecentSearchesSchemaOutput = v.InferOutput<typeof ReadRecentSearchesSchema>;
