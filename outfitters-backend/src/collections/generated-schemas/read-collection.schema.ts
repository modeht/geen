import * as v from 'valibot';
import { ReadCollectionFiltersSchema } from './read-collection-filters.schema';
import { ReadCollectionRelationsSchema } from './read-collection-relations.schema';
export const ReadCollectionSchema = v.object({
filters: ReadCollectionFiltersSchema,
relations: ReadCollectionRelationsSchema,
});
export type TReadCollectionSchemaInput = v.InferInput<typeof ReadCollectionSchema>;
export type TReadCollectionSchemaOutput = v.InferOutput<typeof ReadCollectionSchema>;
