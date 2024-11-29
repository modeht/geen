import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { AccountStatus } from '../entities/user.entity';
import ReadShopperProfileOrdersSchema, { ReadShopperProfileOrders } from './read-shopper-profile-orders.schema'
import ReadBrandProfileOrdersSchema, { ReadBrandProfileOrders } from './read-brand-profile-orders.schema'
import ReadCommentOrdersSchema, { ReadCommentOrders } from '../../comments/generated-schemas/read-comment-orders.schema'
import ReadAffiliationLinkTrackingOrdersSchema, { ReadAffiliationLinkTrackingOrders } from '../../affiliation-links/generated-schemas/read-affiliation-link-tracking-orders.schema'
import ReadNotificationOrdersSchema, { ReadNotificationOrders } from '../../notifications/generated-schemas/read-notification-orders.schema'
import ReadConversationOrdersSchema, { ReadConversationOrders } from '../../conversations/generated-schemas/read-conversation-orders.schema'
import ReadMessageOrdersSchema, { ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'
import ReadPostOrdersSchema, { ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import ReadStoryOrdersSchema, { ReadStoryOrders } from '../../stories/generated-schemas/read-story-orders.schema'
import ReadSavedCollectionOrdersSchema, { ReadSavedCollectionOrders } from '../../saved-collections/generated-schemas/read-saved-collection-orders.schema'
import ReadRecentSearchesOrdersSchema, { ReadRecentSearchesOrders } from '../../search/generated-schemas/read-recent-searches-orders.schema'
import ReadPostLikesOrdersSchema, { ReadPostLikesOrders } from '../../posts/generated-schemas/read-post-likes-orders.schema'
import ReadStoryLikesOrdersSchema, { ReadStoryLikesOrders } from '../../stories/generated-schemas/read-story-likes-orders.schema'


import { LanguageEnum } from '../../../lib/enums'
export class ReadUserOrders {status?: AccountStatus | null | undefined;
email?: OrderDirectionEnum | undefined;
phone?: OrderDirectionEnum | undefined;
password?: OrderDirectionEnum | undefined;
firebaseId?: OrderDirectionEnum | undefined;
emailVerified?: OrderDirectionEnum | undefined;
isGoogleSignin?: OrderDirectionEnum | undefined;
isAppleSignin?: OrderDirectionEnum | undefined;
defaultLang?: LanguageEnum | null | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
brandProfile?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
comments?: ReadCommentOrders | OrderDirectionEnum | undefined;
affiliationLinkTracking?: ReadAffiliationLinkTrackingOrders | OrderDirectionEnum | undefined;
notifications?: ReadNotificationOrders | OrderDirectionEnum | undefined;
initiatedConversations?: ReadConversationOrders | OrderDirectionEnum | undefined;
receivedConversations?: ReadConversationOrders | OrderDirectionEnum | undefined;
sentMessages?: ReadMessageOrders | OrderDirectionEnum | undefined;
receivedMessages?: ReadMessageOrders | OrderDirectionEnum | undefined;
posts?: ReadPostOrders | OrderDirectionEnum | undefined;
stories?: ReadStoryOrders | OrderDirectionEnum | undefined;
savedCollections?: ReadSavedCollectionOrders | OrderDirectionEnum | undefined;
recentSearches?: ReadRecentSearchesOrders | OrderDirectionEnum | undefined;
likedPosts?: ReadPostLikesOrders | OrderDirectionEnum | undefined;
likedStories?: ReadStoryLikesOrders | OrderDirectionEnum | undefined;
taggedInPosts?: ReadPostOrders | OrderDirectionEnum | undefined;
taggedInStories?: ReadStoryOrders | OrderDirectionEnum | undefined;
following?: ReadUserOrders | OrderDirectionEnum | undefined;
follows?: ReadUserOrders | OrderDirectionEnum | undefined;
blockedBy?: ReadUserOrders | OrderDirectionEnum | undefined;
blockedUsers?: ReadUserOrders | OrderDirectionEnum | undefined;
isFollowing?: OrderDirectionEnum | undefined;
isBlockedBy?: OrderDirectionEnum | undefined;
followersCount?: OrderDirectionEnum | undefined}

const ReadUserOrdersSchema: v.GenericSchema<ReadUserOrders> = v.object({status: v.nullish(v.enum(AccountStatus)),
email: v.undefinedable(OrderDirectionSchema),
phone: v.undefinedable(OrderDirectionSchema),
password: v.undefinedable(OrderDirectionSchema),
firebaseId: v.undefinedable(OrderDirectionSchema),
emailVerified: v.undefinedable(OrderDirectionSchema),
isGoogleSignin: v.undefinedable(OrderDirectionSchema),
isAppleSignin: v.undefinedable(OrderDirectionSchema),
defaultLang: v.nullish(v.enum(LanguageEnum)),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
brandProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
comments: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCommentOrdersSchema)])),
affiliationLinkTracking: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkTrackingOrdersSchema)])),
notifications: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
initiatedConversations: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadConversationOrdersSchema)])),
receivedConversations: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadConversationOrdersSchema)])),
sentMessages: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
receivedMessages: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
posts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
stories: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
savedCollections: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionOrdersSchema)])),
recentSearches: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadRecentSearchesOrdersSchema)])),
likedPosts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostLikesOrdersSchema)])),
likedStories: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryLikesOrdersSchema)])),
taggedInPosts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
taggedInStories: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
following: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
follows: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
blockedBy: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
blockedUsers: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
isFollowing: v.undefinedable(OrderDirectionSchema),
isBlockedBy: v.undefinedable(OrderDirectionSchema),
followersCount: v.undefinedable(OrderDirectionSchema)});

export default ReadUserOrdersSchema;




export type TReadUserOrdersSchemaOutput = v.InferOutput<typeof ReadUserOrdersSchema>;
export type TReadUserOrdersSchemaInput = v.InferInput<typeof ReadUserOrdersSchema>;
