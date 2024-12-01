import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import ReadCollaborationOrdersSchema, { ReadCollaborationOrders } from '../../collaborations/generated-schemas/read-collaboration-orders.schema'
import ReadPostOrdersSchema, { ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import ReadStoryOrdersSchema, { ReadStoryOrders } from '../../stories/generated-schemas/read-story-orders.schema'
import ReadProductOrdersSchema, { ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import ReadConversationOrdersSchema, { ReadConversationOrders } from '../../conversations/generated-schemas/read-conversation-orders.schema'
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadCommentOrdersSchema, { ReadCommentOrders } from '../../comments/generated-schemas/read-comment-orders.schema'



export class ReadMessageOrders {readAt?: OrderDirectionEnum;
content?: OrderDirectionEnum;
media?: ReadMediaOrders | OrderDirectionEnum;
reaction?: OrderDirectionEnum;
collaboration?: ReadCollaborationOrders | OrderDirectionEnum;
post?: ReadPostOrders | OrderDirectionEnum;
story?: ReadStoryOrders | OrderDirectionEnum;
product?: ReadProductOrders | OrderDirectionEnum;
conversation?: ReadConversationOrders | OrderDirectionEnum;
from?: ReadUserOrders | OrderDirectionEnum;
to?: ReadUserOrders | OrderDirectionEnum;
comment?: ReadCommentOrders | OrderDirectionEnum;
fromId?: OrderDirectionEnum;
toId?: OrderDirectionEnum;
conversationId?: OrderDirectionEnum;
collaborationId?: OrderDirectionEnum;
postId?: OrderDirectionEnum;
storyId?: OrderDirectionEnum;
commentId?: OrderDirectionEnum;
productId?: OrderDirectionEnum}

const ReadMessageOrdersSchema: v.GenericSchema<ReadMessageOrders> = v.object({readAt: v.optional(OrderDirectionSchema),
content: v.optional(OrderDirectionSchema),
media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
reaction: v.optional(OrderDirectionSchema),
collaboration: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCollaborationOrdersSchema)])),
post: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
story: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
conversation: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadConversationOrdersSchema)])),
from: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
to: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
comment: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCommentOrdersSchema)])),
fromId: v.optional(OrderDirectionSchema),
toId: v.optional(OrderDirectionSchema),
conversationId: v.optional(OrderDirectionSchema),
collaborationId: v.optional(OrderDirectionSchema),
postId: v.optional(OrderDirectionSchema),
storyId: v.optional(OrderDirectionSchema),
commentId: v.optional(OrderDirectionSchema),
productId: v.optional(OrderDirectionSchema)});

export default ReadMessageOrdersSchema;




export type TReadMessageOrdersSchemaOutput = v.InferOutput<typeof ReadMessageOrdersSchema>;
export type TReadMessageOrdersSchemaInput = v.InferInput<typeof ReadMessageOrdersSchema>;
