import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadConversationFiltersSchema from './read-conversation-filters.schema';
import ReadConversationRelationsSchema from './read-conversation-relations.schema';
import ReadConversationOrdersSchema from './read-conversation-orders.schema';
const ReadConversationSchema = v.optional(
	v.object({
		filters: v.optional(ReadConversationFiltersSchema),
		relations: v.optional(ReadConversationRelationsSchema),
		orders: v.optional(ReadConversationOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadConversationSchema;
export type TReadConversationSchemaInput = v.InferInput<typeof ReadConversationSchema>;
export type TReadConversationSchemaOutput = v.InferOutput<typeof ReadConversationSchema>;
