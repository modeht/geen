import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadRecentSearchesFiltersSchema from './read-recent-searches-filters.schema';
import ReadRecentSearchesRelationsSchema from './read-recent-searches-relations.schema';
import ReadRecentSearchesOrdersSchema from './read-recent-searches-orders.schema';
const ReadRecentSearchesSchema = v.optional(v.object({
filters: v.optional(ReadRecentSearchesFiltersSchema),
relations: v.optional(ReadRecentSearchesRelationsSchema),
orders: v.optional(ReadRecentSearchesOrdersSchema),
pagination: v.optional(ReadPaginationSchema),
}));
export default ReadRecentSearchesSchema;
export type TReadRecentSearchesSchemaInput = v.InferInput<typeof ReadRecentSearchesSchema>;
export type TReadRecentSearchesSchemaOutput = v.InferOutput<typeof ReadRecentSearchesSchema>;
