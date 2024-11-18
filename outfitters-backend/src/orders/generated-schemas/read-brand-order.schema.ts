import * as v from 'valibot';
import { ReadBrandOrderFiltersSchema } from './read-brand-order-filters.schema';
import { ReadBrandOrderRelationsSchema } from './read-brand-order-relations.schema';
export const ReadBrandOrderSchema = v.object({
filters: ReadBrandOrderFiltersSchema,
relations: ReadBrandOrderRelationsSchema,
});
export type TReadBrandOrderSchemaInput = v.InferInput<typeof ReadBrandOrderSchema>;
export type TReadBrandOrderSchemaOutput = v.InferOutput<typeof ReadBrandOrderSchema>;
