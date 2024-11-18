import * as v from 'valibot';
import { ReadProductVariantFiltersSchema } from './read-product-variant-filters.schema';
import { ReadProductVariantRelationsSchema } from './read-product-variant-relations.schema';
export const ReadProductVariantSchema = v.object({
filters: v.nullish(ReadProductVariantFiltersSchema),
relations: v.nullish(ReadProductVariantRelationsSchema),
});
export type TReadProductVariantSchemaInput = v.InferInput<typeof ReadProductVariantSchema>;
export type TReadProductVariantSchemaOutput = v.InferOutput<typeof ReadProductVariantSchema>;
