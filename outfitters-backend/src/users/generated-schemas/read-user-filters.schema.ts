import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { AccountStatus } from '../entities/user.entity';
import { ReadShopperProfileFiltersSchema, ReadShopperProfileFiltersSchemaFilters } from './read-shopper-profile-filters.schema'
import { ReadBrandProfileFiltersSchema, ReadBrandProfileFiltersSchemaFilters } from './read-brand-profile-filters.schema'
import { ReadCommentFiltersSchema, ReadCommentFiltersSchemaFilters } from '../../comments/generated-schemas/read-comment-filters.schema'
import { ReadAffiliationLinkTrackingFiltersSchema, ReadAffiliationLinkTrackingFiltersSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link-tracking-filters.schema'
import { ReadNotificationFiltersSchema, ReadNotificationFiltersSchemaFilters } from '../../notifications/generated-schemas/read-notification-filters.schema'
import { ReadConversationFiltersSchema, ReadConversationFiltersSchemaFilters } from '../../conversations/generated-schemas/read-conversation-filters.schema'
import { ReadMessageFiltersSchema, ReadMessageFiltersSchemaFilters } from '../../messages/generated-schemas/read-message-filters.schema'
import { ReadPostFiltersSchema, ReadPostFiltersSchemaFilters } from '../../posts/generated-schemas/read-post-filters.schema'
import { ReadStoryFiltersSchema, ReadStoryFiltersSchemaFilters } from '../../stories/generated-schemas/read-story-filters.schema'
import { ReadSavedCollectionFiltersSchema, ReadSavedCollectionFiltersSchemaFilters } from '../../saved-collections/generated-schemas/read-saved-collection-filters.schema'
import { ReadRecentSearchesFiltersSchema, ReadRecentSearchesFiltersSchemaFilters } from '../../search/generated-schemas/read-recent-searches-filters.schema'
import { ReadPostLikesFiltersSchema, ReadPostLikesFiltersSchemaFilters } from '../../posts/generated-schemas/read-post-likes-filters.schema'
import { ReadStoryLikesFiltersSchema, ReadStoryLikesFiltersSchemaFilters } from '../../stories/generated-schemas/read-story-likes-filters.schema'


import { LanguageEnum } from '../../../lib/enums'
export class ReadUserFiltersSchemaFilters {status?: AccountStatus | null | undefined;
email?: GenericComparable<"string"> | null | undefined;
phone?: GenericComparable<"string"> | null | undefined;
password?: GenericComparable<"string"> | null | undefined;
firebaseId?: GenericComparable<"string"> | null | undefined;
emailVerified?: GenericComparable<"bool"> | null | undefined;
isGoogleSignin?: GenericComparable<"bool"> | null | undefined;
isAppleSignin?: GenericComparable<"bool"> | null | undefined;
defaultLang?: LanguageEnum | null | undefined;
shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null | undefined;
brandProfile?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
comments?: ReadCommentFiltersSchemaFilters | null | undefined;
affiliationLinkTracking?: ReadAffiliationLinkTrackingFiltersSchemaFilters | null | undefined;
notifications?: ReadNotificationFiltersSchemaFilters | null | undefined;
initiatedConversations?: ReadConversationFiltersSchemaFilters | null | undefined;
receivedConversations?: ReadConversationFiltersSchemaFilters | null | undefined;
sentMessages?: ReadMessageFiltersSchemaFilters | null | undefined;
receivedMessages?: ReadMessageFiltersSchemaFilters | null | undefined;
posts?: ReadPostFiltersSchemaFilters | null | undefined;
stories?: ReadStoryFiltersSchemaFilters | null | undefined;
savedCollections?: ReadSavedCollectionFiltersSchemaFilters | null | undefined;
recentSearches?: ReadRecentSearchesFiltersSchemaFilters | null | undefined;
likedPosts?: ReadPostLikesFiltersSchemaFilters | null | undefined;
likedStories?: ReadStoryLikesFiltersSchemaFilters | null | undefined;
taggedInPosts?: ReadPostFiltersSchemaFilters | null | undefined;
taggedInStories?: ReadStoryFiltersSchemaFilters | null | undefined;
following?: ReadUserFiltersSchemaFilters | null | undefined;
follows?: ReadUserFiltersSchemaFilters | null | undefined;
blockedBy?: ReadUserFiltersSchemaFilters | null | undefined;
blockedUsers?: ReadUserFiltersSchemaFilters | null | undefined;
isFollowing?: GenericComparable<"bool"> | null | undefined;
isBlockedBy?: GenericComparable<"bool"> | null | undefined;
followersCount?: GenericComparable<"number"> | null | undefined}

export const ReadUserFiltersSchema: v.GenericSchema<ReadUserFiltersSchemaFilters> = v.object({status: v.nullish(v.enum(AccountStatus)),
email: v.nullish(comparable("string")),
phone: v.nullish(comparable("string")),
password: v.nullish(comparable("string")),
firebaseId: v.nullish(comparable("string")),
emailVerified: v.nullish(comparable("bool")),
isGoogleSignin: v.nullish(comparable("bool")),
isAppleSignin: v.nullish(comparable("bool")),
defaultLang: v.nullish(v.enum(LanguageEnum)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
brandProfile: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
comments: v.nullish(v.lazy(() => ReadCommentFiltersSchema)),
affiliationLinkTracking: v.nullish(v.lazy(() => ReadAffiliationLinkTrackingFiltersSchema)),
notifications: v.nullish(v.lazy(() => ReadNotificationFiltersSchema)),
initiatedConversations: v.nullish(v.lazy(() => ReadConversationFiltersSchema)),
receivedConversations: v.nullish(v.lazy(() => ReadConversationFiltersSchema)),
sentMessages: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
receivedMessages: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
posts: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
stories: v.nullish(v.lazy(() => ReadStoryFiltersSchema)),
savedCollections: v.nullish(v.lazy(() => ReadSavedCollectionFiltersSchema)),
recentSearches: v.nullish(v.lazy(() => ReadRecentSearchesFiltersSchema)),
likedPosts: v.nullish(v.lazy(() => ReadPostLikesFiltersSchema)),
likedStories: v.nullish(v.lazy(() => ReadStoryLikesFiltersSchema)),
taggedInPosts: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
taggedInStories: v.nullish(v.lazy(() => ReadStoryFiltersSchema)),
following: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
follows: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
blockedBy: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
blockedUsers: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
isFollowing: v.nullish(comparable("bool")),
isBlockedBy: v.nullish(comparable("bool")),
followersCount: v.nullish(comparable("number"))})



export type TReadUserFiltersSchemaOutput = v.InferOutput<typeof ReadUserFiltersSchema>;
export type TReadUserFiltersSchemaInput = v.InferInput<typeof ReadUserFiltersSchema>;
