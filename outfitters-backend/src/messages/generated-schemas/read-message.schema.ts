import * as v from 'valibot';
import { ReadMessageFiltersSchema } from './read-message-filters.schema';
import { ReadMessageRelationsSchema } from './read-message-relations.schema';
export const ReadMessageSchema = v.object({
filters: ReadMessageFiltersSchema,
relations: ReadMessageRelationsSchema,
});
export type TReadMessageSchemaInput = v.InferInput<typeof ReadMessageSchema>;
export type TReadMessageSchemaOutput = v.InferOutput<typeof ReadMessageSchema>;
