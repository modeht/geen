import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import { AccountStatus } from '../entities/user.entity';
import ReadShopperProfileOrdersSchema, { ReadShopperProfileOrders } from './read-shopper-profile-orders.schema';
import ReadBrandProfileOrdersSchema, { ReadBrandProfileOrders } from './read-brand-profile-orders.schema';
import ReadCommentOrdersSchema, {
	ReadCommentOrders,
} from '../../comments/generated-schemas/read-comment-orders.schema';
import ReadAffiliationLinkTrackingOrdersSchema, {
	ReadAffiliationLinkTrackingOrders,
} from '../../affiliation-links/generated-schemas/read-affiliation-link-tracking-orders.schema';
import ReadNotificationOrdersSchema, {
	ReadNotificationOrders,
} from '../../notifications/generated-schemas/read-notification-orders.schema';
import ReadConversationOrdersSchema, {
	ReadConversationOrders,
} from '../../conversations/generated-schemas/read-conversation-orders.schema';
import ReadMessageOrdersSchema, {
	ReadMessageOrders,
} from '../../messages/generated-schemas/read-message-orders.schema';
import ReadPostOrdersSchema, { ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema';
import ReadStoryOrdersSchema, { ReadStoryOrders } from '../../stories/generated-schemas/read-story-orders.schema';
import ReadSavedCollectionOrdersSchema, {
	ReadSavedCollectionOrders,
} from '../../saved-collections/generated-schemas/read-saved-collection-orders.schema';
import ReadRecentSearchesOrdersSchema, {
	ReadRecentSearchesOrders,
} from '../../search/generated-schemas/read-recent-searches-orders.schema';
import ReadPostLikesOrdersSchema, {
	ReadPostLikesOrders,
} from '../../posts/generated-schemas/read-post-likes-orders.schema';
import ReadStoryLikesOrdersSchema, {
	ReadStoryLikesOrders,
} from '../../stories/generated-schemas/read-story-likes-orders.schema';

import { LanguageEnum } from '../../../lib/enums';
export class ReadUserOrders {
	status?: AccountStatus | null;
	email?: OrderDirectionEnum;
	phone?: OrderDirectionEnum;
	password?: OrderDirectionEnum;
	firebaseId?: OrderDirectionEnum;
	emailVerified?: OrderDirectionEnum;
	isGoogleSignin?: OrderDirectionEnum;
	isAppleSignin?: OrderDirectionEnum;
	defaultLang?: LanguageEnum | null;
	shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum;
	brandProfile?: ReadBrandProfileOrders | OrderDirectionEnum;
	comments?: ReadCommentOrders | OrderDirectionEnum;
	affiliationLinkTracking?: ReadAffiliationLinkTrackingOrders | OrderDirectionEnum;
	notifications?: ReadNotificationOrders | OrderDirectionEnum;
	initiatedConversations?: ReadConversationOrders | OrderDirectionEnum;
	receivedConversations?: ReadConversationOrders | OrderDirectionEnum;
	sentMessages?: ReadMessageOrders | OrderDirectionEnum;
	receivedMessages?: ReadMessageOrders | OrderDirectionEnum;
	posts?: ReadPostOrders | OrderDirectionEnum;
	stories?: ReadStoryOrders | OrderDirectionEnum;
	savedCollections?: ReadSavedCollectionOrders | OrderDirectionEnum;
	recentSearches?: ReadRecentSearchesOrders | OrderDirectionEnum;
	likedPosts?: ReadPostLikesOrders | OrderDirectionEnum;
	likedStories?: ReadStoryLikesOrders | OrderDirectionEnum;
	taggedInPosts?: ReadPostOrders | OrderDirectionEnum;
	taggedInStories?: ReadStoryOrders | OrderDirectionEnum;
	following?: ReadUserOrders | OrderDirectionEnum;
	follows?: ReadUserOrders | OrderDirectionEnum;
	blockedBy?: ReadUserOrders | OrderDirectionEnum;
	blockedUsers?: ReadUserOrders | OrderDirectionEnum;
	isFollowing?: OrderDirectionEnum;
	isBlockedBy?: OrderDirectionEnum;
	followersCount?: OrderDirectionEnum;
}

const ReadUserOrdersSchema: v.GenericSchema<ReadUserOrders> = v.object({
	status: v.nullish(v.enum(AccountStatus)),
	email: v.optional(OrderDirectionSchema),
	phone: v.optional(OrderDirectionSchema),
	password: v.optional(OrderDirectionSchema),
	firebaseId: v.optional(OrderDirectionSchema),
	emailVerified: v.optional(OrderDirectionSchema),
	isGoogleSignin: v.optional(OrderDirectionSchema),
	isAppleSignin: v.optional(OrderDirectionSchema),
	defaultLang: v.nullish(v.enum(LanguageEnum)),
	shopperProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
	brandProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
	comments: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCommentOrdersSchema)])),
	affiliationLinkTracking: v.optional(
		v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkTrackingOrdersSchema)]),
	),
	notifications: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
	initiatedConversations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadConversationOrdersSchema)])),
	receivedConversations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadConversationOrdersSchema)])),
	sentMessages: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
	receivedMessages: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
	posts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
	stories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
	savedCollections: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionOrdersSchema)])),
	recentSearches: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadRecentSearchesOrdersSchema)])),
	likedPosts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostLikesOrdersSchema)])),
	likedStories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryLikesOrdersSchema)])),
	taggedInPosts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
	taggedInStories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
	following: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	follows: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	blockedBy: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	blockedUsers: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	isFollowing: v.optional(OrderDirectionSchema),
	isBlockedBy: v.optional(OrderDirectionSchema),
	followersCount: v.optional(OrderDirectionSchema),
});

export default ReadUserOrdersSchema;

export type TReadUserOrdersSchemaOutput = v.InferOutput<typeof ReadUserOrdersSchema>;
export type TReadUserOrdersSchemaInput = v.InferInput<typeof ReadUserOrdersSchema>;
