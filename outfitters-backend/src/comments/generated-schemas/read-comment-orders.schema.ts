import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadPostOrdersSchema, { ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import ReadNotificationOrdersSchema, { ReadNotificationOrders } from '../../notifications/generated-schemas/read-notification-orders.schema'
import ReadMessageOrdersSchema, { ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'



export class ReadCommentOrders {content?: OrderDirectionEnum;
commentor?: ReadUserOrders | OrderDirectionEnum;
post?: ReadPostOrders | OrderDirectionEnum;
level?: OrderDirectionEnum;
notifications?: ReadNotificationOrders | OrderDirectionEnum;
messages?: ReadMessageOrders | OrderDirectionEnum;
userId?: OrderDirectionEnum;
replyToId?: OrderDirectionEnum;
postId?: OrderDirectionEnum;
repliesDepth?: OrderDirectionEnum}

const ReadCommentOrdersSchema: v.GenericSchema<ReadCommentOrders> = v.object({content: v.optional(OrderDirectionSchema),
commentor: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
post: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
level: v.optional(OrderDirectionSchema),
notifications: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
messages: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
userId: v.optional(OrderDirectionSchema),
replyToId: v.optional(OrderDirectionSchema),
postId: v.optional(OrderDirectionSchema),
repliesDepth: v.optional(OrderDirectionSchema)});

export default ReadCommentOrdersSchema;




export type TReadCommentOrdersSchemaOutput = v.InferOutput<typeof ReadCommentOrdersSchema>;
export type TReadCommentOrdersSchemaInput = v.InferInput<typeof ReadCommentOrdersSchema>;
