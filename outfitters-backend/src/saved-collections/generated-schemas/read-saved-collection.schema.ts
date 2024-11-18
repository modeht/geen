import * as v from 'valibot';
import { ReadSavedCollectionFiltersSchema } from './read-saved-collection-filters.schema';
import { ReadSavedCollectionRelationsSchema } from './read-saved-collection-relations.schema';
export const ReadSavedCollectionSchema = v.object({
filters: v.nullish(ReadSavedCollectionFiltersSchema),
relations: v.nullish(ReadSavedCollectionRelationsSchema),
});
export type TReadSavedCollectionSchemaInput = v.InferInput<typeof ReadSavedCollectionSchema>;
export type TReadSavedCollectionSchemaOutput = v.InferOutput<typeof ReadSavedCollectionSchema>;
