import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadTaggedProductOrdersSchema, {
	ReadTaggedProductOrders,
} from '../../products/generated-schemas/read-tagged-product-orders.schema';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';
import ReadPostLikesOrdersSchema, { ReadPostLikesOrders } from './read-post-likes-orders.schema';
import ReadCommentOrdersSchema, {
	ReadCommentOrders,
} from '../../comments/generated-schemas/read-comment-orders.schema';
import ReadMessageOrdersSchema, {
	ReadMessageOrders,
} from '../../messages/generated-schemas/read-message-orders.schema';
import ReadSavedCollectionItemOrdersSchema, {
	ReadSavedCollectionItemOrders,
} from '../../saved-collections/generated-schemas/read-saved-collection-item-orders.schema';

export class ReadPostOrders {
	caption?: OrderDirectionEnum;
	media?: ReadMediaOrders | OrderDirectionEnum;
	thumbnail?: ReadMediaOrders | OrderDirectionEnum;
	taggedProducts?: ReadTaggedProductOrders | OrderDirectionEnum;
	postedBy?: ReadUserOrders | OrderDirectionEnum;
	postedById?: OrderDirectionEnum;
	taggedUsers?: ReadUserOrders | OrderDirectionEnum;
	likedByUsers?: ReadPostLikesOrders | OrderDirectionEnum;
	comments?: ReadCommentOrders | OrderDirectionEnum;
	shares?: ReadMessageOrders | OrderDirectionEnum;
	savedInCollections?: ReadSavedCollectionItemOrders | OrderDirectionEnum;
	thumbnailId?: OrderDirectionEnum;
	likesCount?: OrderDirectionEnum;
	commentsCount?: OrderDirectionEnum;
	taggedProductsCount?: OrderDirectionEnum;
	taggedUsersCount?: OrderDirectionEnum;
	isLiked?: OrderDirectionEnum;
}

const ReadPostOrdersSchema: v.GenericSchema<ReadPostOrders> = v.object({
	caption: v.optional(OrderDirectionSchema),
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	thumbnail: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	taggedProducts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTaggedProductOrdersSchema)])),
	postedBy: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	postedById: v.optional(OrderDirectionSchema),
	taggedUsers: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	likedByUsers: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostLikesOrdersSchema)])),
	comments: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCommentOrdersSchema)])),
	shares: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
	savedInCollections: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionItemOrdersSchema)])),
	thumbnailId: v.optional(OrderDirectionSchema),
	likesCount: v.optional(OrderDirectionSchema),
	commentsCount: v.optional(OrderDirectionSchema),
	taggedProductsCount: v.optional(OrderDirectionSchema),
	taggedUsersCount: v.optional(OrderDirectionSchema),
	isLiked: v.optional(OrderDirectionSchema),
});

export default ReadPostOrdersSchema;

export type TReadPostOrdersSchemaOutput = v.InferOutput<typeof ReadPostOrdersSchema>;
export type TReadPostOrdersSchemaInput = v.InferInput<typeof ReadPostOrdersSchema>;
