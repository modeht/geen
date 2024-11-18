import * as v from 'valibot';
import { ReadRefundFiltersSchema } from './read-refund-filters.schema';
import { ReadRefundRelationsSchema } from './read-refund-relations.schema';
export const ReadRefundSchema = v.object({
filters: ReadRefundFiltersSchema,
relations: ReadRefundRelationsSchema,
});
export type TReadRefundSchemaInput = v.InferInput<typeof ReadRefundSchema>;
export type TReadRefundSchemaOutput = v.InferOutput<typeof ReadRefundSchema>;
