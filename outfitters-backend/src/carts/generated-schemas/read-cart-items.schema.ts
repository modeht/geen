import * as v from 'valibot';
import { ReadCartItemsFiltersSchema } from './read-cart-items-filters.schema';
import { ReadCartItemsRelationsSchema } from './read-cart-items-relations.schema';
export const ReadCartItemsSchema = v.object({
	filters: ReadCartItemsFiltersSchema,
	relations: ReadCartItemsRelationsSchema,
});
export type TReadCartItemsSchemaInput = v.InferInput<typeof ReadCartItemsSchema>;
export type TReadCartItemsSchemaOutput = v.InferOutput<typeof ReadCartItemsSchema>;
