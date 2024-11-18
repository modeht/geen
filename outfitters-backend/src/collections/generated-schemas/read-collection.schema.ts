import * as v from 'valibot';
import { ReadCollectionFiltersSchema } from './read-collection-filters.schema';
import { ReadCollectionRelationsSchema } from './read-collection-relations.schema';
export const ReadCollectionSchema = v.object({
filters: v.nullish(ReadCollectionFiltersSchema),
relations: v.nullish(ReadCollectionRelationsSchema),
});
export type TReadCollectionSchemaInput = v.InferInput<typeof ReadCollectionSchema>;
export type TReadCollectionSchemaOutput = v.InferOutput<typeof ReadCollectionSchema>;
