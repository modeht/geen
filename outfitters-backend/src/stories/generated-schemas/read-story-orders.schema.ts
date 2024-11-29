import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import ReadTaggedProductOrdersSchema, { ReadTaggedProductOrders } from '../../products/generated-schemas/read-tagged-product-orders.schema'
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadStoryLikesOrdersSchema, { ReadStoryLikesOrders } from './read-story-likes-orders.schema'
import ReadMessageOrdersSchema, { ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'



export class ReadStoryOrders {background?: OrderDirectionEnum | undefined;
text?: OrderDirectionEnum | undefined;
media?: ReadMediaOrders | OrderDirectionEnum | undefined;
taggedProducts?: ReadTaggedProductOrders | OrderDirectionEnum | undefined;
postedBy?: ReadUserOrders | OrderDirectionEnum | undefined;
taggedUsers?: ReadUserOrders | OrderDirectionEnum | undefined;
likedByUsers?: ReadStoryLikesOrders | OrderDirectionEnum | undefined;
shares?: ReadMessageOrders | OrderDirectionEnum | undefined;
postedById?: OrderDirectionEnum | undefined;
taggedProductsCount?: OrderDirectionEnum | undefined;
taggedUsersCount?: OrderDirectionEnum | undefined;
isLiked?: OrderDirectionEnum | undefined;
isViewed?: OrderDirectionEnum | undefined}

const ReadStoryOrdersSchema: v.GenericSchema<ReadStoryOrders> = v.object({background: v.undefinedable(OrderDirectionSchema),
text: v.undefinedable(OrderDirectionSchema),
media: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
taggedProducts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadTaggedProductOrdersSchema)])),
postedBy: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
taggedUsers: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
likedByUsers: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryLikesOrdersSchema)])),
shares: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
postedById: v.undefinedable(OrderDirectionSchema),
taggedProductsCount: v.undefinedable(OrderDirectionSchema),
taggedUsersCount: v.undefinedable(OrderDirectionSchema),
isLiked: v.undefinedable(OrderDirectionSchema),
isViewed: v.undefinedable(OrderDirectionSchema)});

export default ReadStoryOrdersSchema;




export type TReadStoryOrdersSchemaOutput = v.InferOutput<typeof ReadStoryOrdersSchema>;
export type TReadStoryOrdersSchemaInput = v.InferInput<typeof ReadStoryOrdersSchema>;
