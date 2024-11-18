import * as v from 'valibot';
import { ReadTaggedProductFiltersSchema } from './read-tagged-product-filters.schema';
import { ReadTaggedProductRelationsSchema } from './read-tagged-product-relations.schema';
export const ReadTaggedProductSchema = v.object({
filters: ReadTaggedProductFiltersSchema,
relations: ReadTaggedProductRelationsSchema,
});
export type TReadTaggedProductSchemaInput = v.InferInput<typeof ReadTaggedProductSchema>;
export type TReadTaggedProductSchemaOutput = v.InferOutput<typeof ReadTaggedProductSchema>;
