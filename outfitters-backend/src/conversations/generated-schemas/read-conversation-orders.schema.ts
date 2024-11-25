import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadUserOrdersSchema, ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import { ReadMessageOrdersSchema, ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'



export class ReadConversationOrders {from?: ReadUserOrders | OrderDirectionEnum | undefined;
to?: ReadUserOrders | OrderDirectionEnum | undefined;
messages?: ReadMessageOrders | OrderDirectionEnum | undefined}

export const ReadConversationOrdersSchema: v.GenericSchema<ReadConversationOrders> = v.object({from: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
to: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
messages: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)]))})



export type TReadConversationOrdersSchemaOutput = v.InferOutput<typeof ReadConversationOrdersSchema>;
export type TReadConversationOrdersSchemaInput = v.InferInput<typeof ReadConversationOrdersSchema>;
