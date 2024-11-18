import * as v from 'valibot';
import { ReadOrderFiltersSchema } from './read-order-filters.schema';
import { ReadOrderRelationsSchema } from './read-order-relations.schema';
export const ReadOrderSchema = v.object({
filters: v.nullish(ReadOrderFiltersSchema),
relations: v.nullish(ReadOrderRelationsSchema),
});
export type TReadOrderSchemaInput = v.InferInput<typeof ReadOrderSchema>;
export type TReadOrderSchemaOutput = v.InferOutput<typeof ReadOrderSchema>;
