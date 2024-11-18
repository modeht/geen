import * as v from 'valibot';
import { ReadCartFiltersSchema } from './read-cart-filters.schema';
import { ReadCartRelationsSchema } from './read-cart-relations.schema';
export const ReadCartSchema = v.object({
filters: v.nullish(ReadCartFiltersSchema),
relations: v.nullish(ReadCartRelationsSchema),
});
export type TReadCartSchemaInput = v.InferInput<typeof ReadCartSchema>;
export type TReadCartSchemaOutput = v.InferOutput<typeof ReadCartSchema>;
