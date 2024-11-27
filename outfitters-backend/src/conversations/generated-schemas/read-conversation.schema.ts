import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadConversationFiltersSchema } from './read-conversation-filters.schema';
import { ReadConversationRelationsSchema } from './read-conversation-relations.schema';
import { ReadConversationOrdersSchema } from './read-conversation-orders.schema';
export const ReadConversationSchema = v.object({
filters: v.undefinedable(ReadConversationFiltersSchema),
relations: v.undefinedable(ReadConversationRelationsSchema),
orders: v.undefinedable(ReadConversationOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
});
export type TReadConversationSchemaInput = v.InferInput<typeof ReadConversationSchema>;
export type TReadConversationSchemaOutput = v.InferOutput<typeof ReadConversationSchema>;
