import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadRecentSearchesFiltersSchema } from './read-recent-searches-filters.schema';
import { ReadRecentSearchesRelationsSchema } from './read-recent-searches-relations.schema';
import { ReadRecentSearchesOrdersSchema } from './read-recent-searches-orders.schema';
export const ReadRecentSearchesSchema = v.object({
filters: v.undefinedable(ReadRecentSearchesFiltersSchema),
relations: v.undefinedable(ReadRecentSearchesRelationsSchema),
orders: v.undefinedable(ReadRecentSearchesOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadRecentSearchesSchemaInput = v.InferInput<typeof ReadRecentSearchesSchema>;
export type TReadRecentSearchesSchemaOutput = v.InferOutput<typeof ReadRecentSearchesSchema>;
