import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';
import ReadMessageOrdersSchema, {
	ReadMessageOrders,
} from '../../messages/generated-schemas/read-message-orders.schema';

export class ReadConversationOrders {
	initiator?: ReadUserOrders | OrderDirectionEnum;
	target?: ReadUserOrders | OrderDirectionEnum;
	messages?: ReadMessageOrders | OrderDirectionEnum;
}

const ReadConversationOrdersSchema: v.GenericSchema<ReadConversationOrders> = v.object({
	initiator: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	target: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	messages: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
});

export default ReadConversationOrdersSchema;

export type TReadConversationOrdersSchemaOutput = v.InferOutput<typeof ReadConversationOrdersSchema>;
export type TReadConversationOrdersSchemaInput = v.InferInput<typeof ReadConversationOrdersSchema>;
