import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';
import ReadConversationOrdersSchema, {
	ReadConversationOrders,
} from '../../conversations/generated-schemas/read-conversation-orders.schema';
import ReadAdOrdersSchema, { ReadAdOrders } from '../../ads/generated-schemas/read-ad-orders.schema';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';

export class ReadMessageOrders {
	sender?: ReadUserOrders | OrderDirectionEnum;
	receiver?: ReadUserOrders | OrderDirectionEnum;
	content?: OrderDirectionEnum;
	isRead?: OrderDirectionEnum;
	conversation?: ReadConversationOrders | OrderDirectionEnum;
	ad?: ReadAdOrders | OrderDirectionEnum;
	media?: ReadMediaOrders | OrderDirectionEnum;
}

const ReadMessageOrdersSchema: v.GenericSchema<ReadMessageOrders> = v.object({
	sender: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	receiver: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	content: v.optional(OrderDirectionSchema),
	isRead: v.optional(OrderDirectionSchema),
	conversation: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadConversationOrdersSchema)])),
	ad: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAdOrdersSchema)])),
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
});

export default ReadMessageOrdersSchema;

export type TReadMessageOrdersSchemaOutput = v.InferOutput<typeof ReadMessageOrdersSchema>;
export type TReadMessageOrdersSchemaInput = v.InferInput<typeof ReadMessageOrdersSchema>;
