import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadSavedCollectionFiltersSchema from './read-saved-collection-filters.schema';
import ReadSavedCollectionRelationsSchema from './read-saved-collection-relations.schema';
import ReadSavedCollectionOrdersSchema from './read-saved-collection-orders.schema';
const ReadSavedCollectionSchema = v.optional(v.object({
filters: v.optional(ReadSavedCollectionFiltersSchema),
relations: v.optional(ReadSavedCollectionRelationsSchema),
orders: v.optional(ReadSavedCollectionOrdersSchema),
pagination: v.optional(ReadPaginationSchema),
}));
export default ReadSavedCollectionSchema;
export type TReadSavedCollectionSchemaInput = v.InferInput<typeof ReadSavedCollectionSchema>;
export type TReadSavedCollectionSchemaOutput = v.InferOutput<typeof ReadSavedCollectionSchema>;
