import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadSavedCollectionItemFiltersSchema } from './read-saved-collection-item-filters.schema';
import { ReadSavedCollectionItemRelationsSchema } from './read-saved-collection-item-relations.schema';
import { ReadSavedCollectionItemOrdersSchema } from './read-saved-collection-item-orders.schema';
const ReadSavedCollectionItemSchema = v.optional(v.object({
filters: v.undefinedable(ReadSavedCollectionItemFiltersSchema),
relations: v.undefinedable(ReadSavedCollectionItemRelationsSchema),
orders: v.undefinedable(ReadSavedCollectionItemOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadSavedCollectionItemSchema;
export type TReadSavedCollectionItemSchemaInput = v.InferInput<typeof ReadSavedCollectionItemSchema>;
export type TReadSavedCollectionItemSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemSchema>;
