import * as v from 'valibot';
import { ReadOrderFiltersSchema } from './read-order-filters.schema';
import { ReadOrderRelationsSchema } from './read-order-relations.schema';
export const ReadOrderSchema = v.object({
filters: ReadOrderFiltersSchema,
relations: ReadOrderRelationsSchema,
});
export type TReadOrderSchemaInput = v.InferInput<typeof ReadOrderSchema>;
export type TReadOrderSchemaOutput = v.InferOutput<typeof ReadOrderSchema>;
