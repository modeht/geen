import * as v from 'valibot';
import { ReadConversationFiltersSchema } from './read-conversation-filters.schema';
import { ReadConversationRelationsSchema } from './read-conversation-relations.schema';
export const ReadConversationSchema = v.object({
filters: ReadConversationFiltersSchema,
relations: ReadConversationRelationsSchema,
});
export type TReadConversationSchemaInput = v.InferInput<typeof ReadConversationSchema>;
export type TReadConversationSchemaOutput = v.InferOutput<typeof ReadConversationSchema>;
