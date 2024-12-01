import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadMessageOrdersSchema, { ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'



export class ReadConversationOrders {isSupport?: OrderDirectionEnum;
from?: ReadUserOrders | OrderDirectionEnum;
to?: ReadUserOrders | OrderDirectionEnum;
messages?: ReadMessageOrders | OrderDirectionEnum;
archivedByFrom?: OrderDirectionEnum;
archivedByTo?: OrderDirectionEnum;
fromId?: OrderDirectionEnum;
toId?: OrderDirectionEnum;
isCollaboration?: OrderDirectionEnum}

const ReadConversationOrdersSchema: v.GenericSchema<ReadConversationOrders> = v.object({isSupport: v.optional(OrderDirectionSchema),
from: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
to: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
messages: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
archivedByFrom: v.optional(OrderDirectionSchema),
archivedByTo: v.optional(OrderDirectionSchema),
fromId: v.optional(OrderDirectionSchema),
toId: v.optional(OrderDirectionSchema),
isCollaboration: v.optional(OrderDirectionSchema)});

export default ReadConversationOrdersSchema;




export type TReadConversationOrdersSchemaOutput = v.InferOutput<typeof ReadConversationOrdersSchema>;
export type TReadConversationOrdersSchemaInput = v.InferInput<typeof ReadConversationOrdersSchema>;
