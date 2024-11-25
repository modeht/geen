import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadUserOrdersSchema, ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import { ReadPostOrdersSchema, ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import { ReadNotificationOrdersSchema, ReadNotificationOrders } from '../../notifications/generated-schemas/read-notification-orders.schema'
import { ReadMessageOrdersSchema, ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'



export class ReadCommentOrders {content?: OrderDirectionEnum | undefined;
commentor?: ReadUserOrders | OrderDirectionEnum | undefined;
post?: ReadPostOrders | OrderDirectionEnum | undefined;
level?: OrderDirectionEnum | undefined;
notifications?: ReadNotificationOrders | OrderDirectionEnum | undefined;
messages?: ReadMessageOrders | OrderDirectionEnum | undefined;
userId?: OrderDirectionEnum | undefined;
replyToId?: OrderDirectionEnum | undefined;
postId?: OrderDirectionEnum | undefined;
repliesDepth?: OrderDirectionEnum | undefined}

export const ReadCommentOrdersSchema: v.GenericSchema<ReadCommentOrders> = v.object({content: v.undefinedable(OrderDirectionSchema),
commentor: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
post: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
level: v.undefinedable(OrderDirectionSchema),
notifications: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
messages: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
userId: v.undefinedable(OrderDirectionSchema),
replyToId: v.undefinedable(OrderDirectionSchema),
postId: v.undefinedable(OrderDirectionSchema),
repliesDepth: v.undefinedable(OrderDirectionSchema)})



export type TReadCommentOrdersSchemaOutput = v.InferOutput<typeof ReadCommentOrdersSchema>;
export type TReadCommentOrdersSchemaInput = v.InferInput<typeof ReadCommentOrdersSchema>;
