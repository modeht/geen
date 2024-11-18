import * as v from 'valibot';
import { ReadProductFiltersSchema } from './read-product-filters.schema';
import { ReadProductRelationsSchema } from './read-product-relations.schema';
export const ReadProductSchema = v.object({
filters: v.nullish(ReadProductFiltersSchema),
relations: v.nullish(ReadProductRelationsSchema),
});
export type TReadProductSchemaInput = v.InferInput<typeof ReadProductSchema>;
export type TReadProductSchemaOutput = v.InferOutput<typeof ReadProductSchema>;
