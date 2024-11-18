import * as v from 'valibot';
import { ReadSavedCollectionItemFiltersSchema } from './read-saved-collection-item-filters.schema';
import { ReadSavedCollectionItemRelationsSchema } from './read-saved-collection-item-relations.schema';
export const ReadSavedCollectionItemSchema = v.object({
filters: v.nullish(ReadSavedCollectionItemFiltersSchema),
relations: v.nullish(ReadSavedCollectionItemRelationsSchema),
});
export type TReadSavedCollectionItemSchemaInput = v.InferInput<typeof ReadSavedCollectionItemSchema>;
export type TReadSavedCollectionItemSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemSchema>;
