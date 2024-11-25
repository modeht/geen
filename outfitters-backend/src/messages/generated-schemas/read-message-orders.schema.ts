import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadMediaOrdersSchema, ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import { ReadCollaborationOrdersSchema, ReadCollaborationOrders } from '../../collaborations/generated-schemas/read-collaboration-orders.schema'
import { ReadPostOrdersSchema, ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import { ReadStoryOrdersSchema, ReadStoryOrders } from '../../stories/generated-schemas/read-story-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import { ReadConversationOrdersSchema, ReadConversationOrders } from '../../conversations/generated-schemas/read-conversation-orders.schema'
import { ReadUserOrdersSchema, ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import { ReadCommentOrdersSchema, ReadCommentOrders } from '../../comments/generated-schemas/read-comment-orders.schema'



export class ReadMessageOrders {readAt?: OrderDirectionEnum | undefined;
content?: OrderDirectionEnum | undefined;
media?: ReadMediaOrders | OrderDirectionEnum | undefined;
reaction?: OrderDirectionEnum | undefined;
collaboration?: ReadCollaborationOrders | OrderDirectionEnum | undefined;
post?: ReadPostOrders | OrderDirectionEnum | undefined;
story?: ReadStoryOrders | OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined;
conversation?: ReadConversationOrders | OrderDirectionEnum | undefined;
from?: ReadUserOrders | OrderDirectionEnum | undefined;
to?: ReadUserOrders | OrderDirectionEnum | undefined;
comment?: ReadCommentOrders | OrderDirectionEnum | undefined;
fromId?: OrderDirectionEnum | undefined;
toId?: OrderDirectionEnum | undefined;
conversationId?: OrderDirectionEnum | undefined;
collaborationId?: OrderDirectionEnum | undefined;
postId?: OrderDirectionEnum | undefined;
storyId?: OrderDirectionEnum | undefined;
commentId?: OrderDirectionEnum | undefined;
productId?: OrderDirectionEnum | undefined}

export const ReadMessageOrdersSchema: v.GenericSchema<ReadMessageOrders> = v.object({readAt: v.undefinedable(OrderDirectionSchema),
content: v.undefinedable(OrderDirectionSchema),
media: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
reaction: v.undefinedable(OrderDirectionSchema),
collaboration: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCollaborationOrdersSchema)])),
post: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
story: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
conversation: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadConversationOrdersSchema)])),
from: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
to: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
comment: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCommentOrdersSchema)])),
fromId: v.undefinedable(OrderDirectionSchema),
toId: v.undefinedable(OrderDirectionSchema),
conversationId: v.undefinedable(OrderDirectionSchema),
collaborationId: v.undefinedable(OrderDirectionSchema),
postId: v.undefinedable(OrderDirectionSchema),
storyId: v.undefinedable(OrderDirectionSchema),
commentId: v.undefinedable(OrderDirectionSchema),
productId: v.undefinedable(OrderDirectionSchema)})



export type TReadMessageOrdersSchemaOutput = v.InferOutput<typeof ReadMessageOrdersSchema>;
export type TReadMessageOrdersSchemaInput = v.InferInput<typeof ReadMessageOrdersSchema>;
