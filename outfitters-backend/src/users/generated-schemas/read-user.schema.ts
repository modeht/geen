import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { AccountStatus } from '../entities/user.entity';
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from './read-shopper-profile.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from './read-brand-profile.schema'
import { ReadCommentSchema, ReadCommentSchemaFilters } from '../../comments/generated-schemas/read-comment.schema'
import { ReadAffiliationLinkTrackingSchema, ReadAffiliationLinkTrackingSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link-tracking.schema'
import { ReadNotificationSchema, ReadNotificationSchemaFilters } from '../../notifications/generated-schemas/read-notification.schema'
import { ReadConversationSchema, ReadConversationSchemaFilters } from '../../conversations/generated-schemas/read-conversation.schema'
import { ReadMessageSchema, ReadMessageSchemaFilters } from '../../messages/generated-schemas/read-message.schema'
import { ReadPostSchema, ReadPostSchemaFilters } from '../../posts/generated-schemas/read-post.schema'
import { ReadStorySchema, ReadStorySchemaFilters } from '../../stories/generated-schemas/read-story.schema'
import { ReadSavedCollectionSchema, ReadSavedCollectionSchemaFilters } from '../../saved-collections/generated-schemas/read-saved-collection.schema'
import { ReadRecentSearchesSchema, ReadRecentSearchesSchemaFilters } from '../../search/generated-schemas/read-recent-searches.schema'
import { ReadPostLikesSchema, ReadPostLikesSchemaFilters } from '../../posts/generated-schemas/read-post-likes.schema'
import { ReadStoryLikesSchema, ReadStoryLikesSchemaFilters } from '../../stories/generated-schemas/read-story-likes.schema'

export class ReadUserSchemaFilters {email?: GenericComparable<"string"> | null | undefined;
phone?: GenericComparable<"string"> | null | undefined;
password?: GenericComparable<"string"> | null | undefined;
firebaseId?: GenericComparable<"string"> | null | undefined;
emailVerified?: GenericComparable<"bool"> | null | undefined;
isGoogleSignin?: GenericComparable<"bool"> | null | undefined;
isAppleSignin?: GenericComparable<"bool"> | null | undefined;
shopperProfile?: ReadShopperProfileSchemaFilters | null | undefined;
brandProfile?: ReadBrandProfileSchemaFilters | null | undefined;
comments?: ReadCommentSchemaFilters | null | undefined;
affiliationLinkTracking?: ReadAffiliationLinkTrackingSchemaFilters | null | undefined;
notifications?: ReadNotificationSchemaFilters | null | undefined;
initiatedConversations?: ReadConversationSchemaFilters | null | undefined;
receivedConversations?: ReadConversationSchemaFilters | null | undefined;
sentMessages?: ReadMessageSchemaFilters | null | undefined;
receivedMessages?: ReadMessageSchemaFilters | null | undefined;
posts?: ReadPostSchemaFilters | null | undefined;
stories?: ReadStorySchemaFilters | null | undefined;
savedCollections?: ReadSavedCollectionSchemaFilters | null | undefined;
recentSearches?: ReadRecentSearchesSchemaFilters | null | undefined;
likedPosts?: ReadPostLikesSchemaFilters | null | undefined;
likedStories?: ReadStoryLikesSchemaFilters | null | undefined;
taggedInPosts?: ReadPostSchemaFilters | null | undefined;
taggedInStories?: ReadStorySchemaFilters | null | undefined;
following?: ReadUserSchemaFilters | null | undefined;
follows?: ReadUserSchemaFilters | null | undefined;
blockedBy?: ReadUserSchemaFilters | null | undefined;
blockedUsers?: ReadUserSchemaFilters | null | undefined;
isFollowing?: GenericComparable<"bool"> | null | undefined;
isBlockedBy?: GenericComparable<"bool"> | null | undefined;
followersCount?: GenericComparable<"number"> | null | undefined}

export const ReadUserSchema: v.GenericSchema<ReadUserSchemaFilters> = v.object({email: v.nullish(comparable("string")),
phone: v.nullish(comparable("string")),
password: v.nullish(comparable("string")),
firebaseId: v.nullish(comparable("string")),
emailVerified: v.nullish(comparable("bool")),
isGoogleSignin: v.nullish(comparable("bool")),
isAppleSignin: v.nullish(comparable("bool")),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
brandProfile: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
comments: v.nullish(v.lazy(() => ReadCommentSchema)),
affiliationLinkTracking: v.nullish(v.lazy(() => ReadAffiliationLinkTrackingSchema)),
notifications: v.nullish(v.lazy(() => ReadNotificationSchema)),
initiatedConversations: v.nullish(v.lazy(() => ReadConversationSchema)),
receivedConversations: v.nullish(v.lazy(() => ReadConversationSchema)),
sentMessages: v.nullish(v.lazy(() => ReadMessageSchema)),
receivedMessages: v.nullish(v.lazy(() => ReadMessageSchema)),
posts: v.nullish(v.lazy(() => ReadPostSchema)),
stories: v.nullish(v.lazy(() => ReadStorySchema)),
savedCollections: v.nullish(v.lazy(() => ReadSavedCollectionSchema)),
recentSearches: v.nullish(v.lazy(() => ReadRecentSearchesSchema)),
likedPosts: v.nullish(v.lazy(() => ReadPostLikesSchema)),
likedStories: v.nullish(v.lazy(() => ReadStoryLikesSchema)),
taggedInPosts: v.nullish(v.lazy(() => ReadPostSchema)),
taggedInStories: v.nullish(v.lazy(() => ReadStorySchema)),
following: v.nullish(v.lazy(() => ReadUserSchema)),
follows: v.nullish(v.lazy(() => ReadUserSchema)),
blockedBy: v.nullish(v.lazy(() => ReadUserSchema)),
blockedUsers: v.nullish(v.lazy(() => ReadUserSchema)),
isFollowing: v.nullish(comparable("bool")),
isBlockedBy: v.nullish(comparable("bool")),
followersCount: v.nullish(comparable("number"))})



export type TReadUserSchema = v.InferOutput<typeof ReadUserSchema>
export type TReadUserSchemaInput = v.InferInput<typeof ReadUserSchema>
