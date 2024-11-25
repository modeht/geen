import * as v from 'valibot';
import { ReadSavedCollectionItemFiltersSchema } from './read-saved-collection-item-filters.schema';
import { ReadSavedCollectionItemRelationsSchema } from './read-saved-collection-item-relations.schema';
import { ReadSavedCollectionItemOrdersSchema } from './read-saved-collection-item-orders.schema';
export const ReadSavedCollectionItemSchema = v.object({
filters: v.undefinedable(ReadSavedCollectionItemFiltersSchema),
relations: v.undefinedable(ReadSavedCollectionItemRelationsSchema),
orders: v.undefinedable(ReadSavedCollectionItemOrdersSchema),
});
export type TReadSavedCollectionItemSchemaInput = v.InferInput<typeof ReadSavedCollectionItemSchema>;
export type TReadSavedCollectionItemSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemSchema>;
