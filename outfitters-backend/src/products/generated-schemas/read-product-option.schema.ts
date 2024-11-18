import * as v from 'valibot';
import { ReadProductOptionFiltersSchema } from './read-product-option-filters.schema';
import { ReadProductOptionRelationsSchema } from './read-product-option-relations.schema';
export const ReadProductOptionSchema = v.object({
filters: ReadProductOptionFiltersSchema,
relations: ReadProductOptionRelationsSchema,
});
export type TReadProductOptionSchemaInput = v.InferInput<typeof ReadProductOptionSchema>;
export type TReadProductOptionSchemaOutput = v.InferOutput<typeof ReadProductOptionSchema>;
