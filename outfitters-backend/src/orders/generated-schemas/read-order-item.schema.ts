import * as v from 'valibot';
import { ReadOrderItemFiltersSchema } from './read-order-item-filters.schema';
import { ReadOrderItemRelationsSchema } from './read-order-item-relations.schema';
export const ReadOrderItemSchema = v.object({
filters: v.nullish(ReadOrderItemFiltersSchema),
relations: v.nullish(ReadOrderItemRelationsSchema),
});
export type TReadOrderItemSchemaInput = v.InferInput<typeof ReadOrderItemSchema>;
export type TReadOrderItemSchemaOutput = v.InferOutput<typeof ReadOrderItemSchema>;
