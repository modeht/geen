import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadSavedCollectionItemFiltersSchema from './read-saved-collection-item-filters.schema';
import ReadSavedCollectionItemRelationsSchema from './read-saved-collection-item-relations.schema';
import ReadSavedCollectionItemOrdersSchema from './read-saved-collection-item-orders.schema';
const ReadSavedCollectionItemSchema = v.optional(v.object({
filters: v.optional(ReadSavedCollectionItemFiltersSchema),
relations: v.optional(ReadSavedCollectionItemRelationsSchema),
orders: v.optional(ReadSavedCollectionItemOrdersSchema),
pagination: v.optional(ReadPaginationSchema),
}));
export default ReadSavedCollectionItemSchema;
export type TReadSavedCollectionItemSchemaInput = v.InferInput<typeof ReadSavedCollectionItemSchema>;
export type TReadSavedCollectionItemSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemSchema>;
