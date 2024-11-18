import * as v from 'valibot';
import { ReadProductOptionValueFiltersSchema } from './read-product-option-value-filters.schema';
import { ReadProductOptionValueRelationsSchema } from './read-product-option-value-relations.schema';
export const ReadProductOptionValueSchema = v.object({
filters: ReadProductOptionValueFiltersSchema,
relations: ReadProductOptionValueRelationsSchema,
});
export type TReadProductOptionValueSchemaInput = v.InferInput<typeof ReadProductOptionValueSchema>;
export type TReadProductOptionValueSchemaOutput = v.InferOutput<typeof ReadProductOptionValueSchema>;
