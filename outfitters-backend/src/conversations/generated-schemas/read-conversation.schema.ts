import * as v from 'valibot';
import { ReadConversationFiltersSchema } from './read-conversation-filters.schema';
import { ReadConversationRelationsSchema } from './read-conversation-relations.schema';
import { ReadConversationOrdersSchema } from './read-conversation-orders.schema';
export const ReadConversationSchema = v.object({
filters: v.undefinedable(ReadConversationFiltersSchema),
relations: v.undefinedable(ReadConversationRelationsSchema),
orders: v.undefinedable(ReadConversationOrdersSchema),
});
export type TReadConversationSchemaInput = v.InferInput<typeof ReadConversationSchema>;
export type TReadConversationSchemaOutput = v.InferOutput<typeof ReadConversationSchema>;
