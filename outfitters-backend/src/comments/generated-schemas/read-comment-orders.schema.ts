import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadUserOrdersSchema, ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import { ReadPostOrdersSchema, ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import { ReadNotificationOrdersSchema, ReadNotificationOrders } from '../../notifications/generated-schemas/read-notification-orders.schema'
import { ReadMessageOrdersSchema, ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'



export class ReadCommentOrders {commentor?: ReadUserOrders | OrderDirectionEnum | undefined;
post?: ReadPostOrders | OrderDirectionEnum | undefined;
notifications?: ReadNotificationOrders | OrderDirectionEnum | undefined;
messages?: ReadMessageOrders | OrderDirectionEnum | undefined}

export const ReadCommentOrdersSchema: v.GenericSchema<ReadCommentOrders> = v.object({commentor: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
post: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
notifications: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
messages: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)]))})



export type TReadCommentOrdersSchemaOutput = v.InferOutput<typeof ReadCommentOrdersSchema>;
export type TReadCommentOrdersSchemaInput = v.InferInput<typeof ReadCommentOrdersSchema>;
