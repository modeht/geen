import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadStoryFiltersSchema from './read-story-filters.schema';
import ReadStoryRelationsSchema from './read-story-relations.schema';
import ReadStoryOrdersSchema from './read-story-orders.schema';
const ReadStorySchema = v.optional(v.object({
filters: v.optional(ReadStoryFiltersSchema),
relations: v.optional(ReadStoryRelationsSchema),
orders: v.optional(ReadStoryOrdersSchema),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));
export default ReadStorySchema;
export type TReadStorySchemaInput = v.InferInput<typeof ReadStorySchema>;
export type TReadStorySchemaOutput = v.InferOutput<typeof ReadStorySchema>;
