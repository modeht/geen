import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import ReadTaggedProductOrdersSchema, { ReadTaggedProductOrders } from '../../products/generated-schemas/read-tagged-product-orders.schema'
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadStoryLikesOrdersSchema, { ReadStoryLikesOrders } from './read-story-likes-orders.schema'
import ReadMessageOrdersSchema, { ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'



export class ReadStoryOrders {background?: OrderDirectionEnum;
text?: OrderDirectionEnum;
media?: ReadMediaOrders | OrderDirectionEnum;
taggedProducts?: ReadTaggedProductOrders | OrderDirectionEnum;
postedBy?: ReadUserOrders | OrderDirectionEnum;
taggedUsers?: ReadUserOrders | OrderDirectionEnum;
likedByUsers?: ReadStoryLikesOrders | OrderDirectionEnum;
shares?: ReadMessageOrders | OrderDirectionEnum;
postedById?: OrderDirectionEnum;
taggedProductsCount?: OrderDirectionEnum;
taggedUsersCount?: OrderDirectionEnum;
isLiked?: OrderDirectionEnum;
isViewed?: OrderDirectionEnum}

const ReadStoryOrdersSchema: v.GenericSchema<ReadStoryOrders> = v.object({background: v.optional(OrderDirectionSchema),
text: v.optional(OrderDirectionSchema),
media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
taggedProducts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTaggedProductOrdersSchema)])),
postedBy: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
taggedUsers: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
likedByUsers: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryLikesOrdersSchema)])),
shares: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
postedById: v.optional(OrderDirectionSchema),
taggedProductsCount: v.optional(OrderDirectionSchema),
taggedUsersCount: v.optional(OrderDirectionSchema),
isLiked: v.optional(OrderDirectionSchema),
isViewed: v.optional(OrderDirectionSchema)});

export default ReadStoryOrdersSchema;




export type TReadStoryOrdersSchemaOutput = v.InferOutput<typeof ReadStoryOrdersSchema>;
export type TReadStoryOrdersSchemaInput = v.InferInput<typeof ReadStoryOrdersSchema>;
