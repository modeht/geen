import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { AccountStatus } from '../entities/user.entity';
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelationsSchemaRelations } from './read-shopper-profile-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelationsSchemaRelations } from './read-brand-profile-relations.schema'
import { ReadCommentRelationsSchema, ReadCommentRelationsSchemaRelations } from '../../comments/generated-schemas/read-comment-relations.schema'
import { ReadAffiliationLinkTrackingRelationsSchema, ReadAffiliationLinkTrackingRelationsSchemaRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-tracking-relations.schema'
import { ReadNotificationRelationsSchema, ReadNotificationRelationsSchemaRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'
import { ReadConversationRelationsSchema, ReadConversationRelationsSchemaRelations } from '../../conversations/generated-schemas/read-conversation-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelationsSchemaRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelationsSchemaRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelationsSchemaRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import { ReadSavedCollectionRelationsSchema, ReadSavedCollectionRelationsSchemaRelations } from '../../saved-collections/generated-schemas/read-saved-collection-relations.schema'
import { ReadRecentSearchesRelationsSchema, ReadRecentSearchesRelationsSchemaRelations } from '../../search/generated-schemas/read-recent-searches-relations.schema'
import { ReadPostLikesRelationsSchema, ReadPostLikesRelationsSchemaRelations } from '../../posts/generated-schemas/read-post-likes-relations.schema'
import { ReadStoryLikesRelationsSchema, ReadStoryLikesRelationsSchemaRelations } from '../../stories/generated-schemas/read-story-likes-relations.schema'

export class ReadUserRelationsSchemaRelations {shopperProfile?: ReadShopperProfileRelationsSchemaRelations | boolean | null | undefined;
brandProfile?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
comments?: ReadCommentRelationsSchemaRelations | boolean | null | undefined;
affiliationLinkTracking?: ReadAffiliationLinkTrackingRelationsSchemaRelations | boolean | null | undefined;
notifications?: ReadNotificationRelationsSchemaRelations | boolean | null | undefined;
initiatedConversations?: ReadConversationRelationsSchemaRelations | boolean | null | undefined;
receivedConversations?: ReadConversationRelationsSchemaRelations | boolean | null | undefined;
sentMessages?: ReadMessageRelationsSchemaRelations | boolean | null | undefined;
receivedMessages?: ReadMessageRelationsSchemaRelations | boolean | null | undefined;
posts?: ReadPostRelationsSchemaRelations | boolean | null | undefined;
stories?: ReadStoryRelationsSchemaRelations | boolean | null | undefined;
savedCollections?: ReadSavedCollectionRelationsSchemaRelations | boolean | null | undefined;
recentSearches?: ReadRecentSearchesRelationsSchemaRelations | boolean | null | undefined;
likedPosts?: ReadPostLikesRelationsSchemaRelations | boolean | null | undefined;
likedStories?: ReadStoryLikesRelationsSchemaRelations | boolean | null | undefined;
taggedInPosts?: ReadPostRelationsSchemaRelations | boolean | null | undefined;
taggedInStories?: ReadStoryRelationsSchemaRelations | boolean | null | undefined;
following?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
follows?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
blockedBy?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
blockedUsers?: ReadUserRelationsSchemaRelations | boolean | null | undefined}

export const ReadUserRelationsSchema: v.GenericSchema<ReadUserRelationsSchemaRelations> = v.object({shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
brandProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
comments: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCommentRelationsSchema)])),
affiliationLinkTracking: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkTrackingRelationsSchema)])),
notifications: v.nullish(v.union([v.boolean(), v.lazy(() => ReadNotificationRelationsSchema)])),
initiatedConversations: v.nullish(v.union([v.boolean(), v.lazy(() => ReadConversationRelationsSchema)])),
receivedConversations: v.nullish(v.union([v.boolean(), v.lazy(() => ReadConversationRelationsSchema)])),
sentMessages: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)])),
receivedMessages: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)])),
posts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
stories: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)])),
savedCollections: v.nullish(v.union([v.boolean(), v.lazy(() => ReadSavedCollectionRelationsSchema)])),
recentSearches: v.nullish(v.union([v.boolean(), v.lazy(() => ReadRecentSearchesRelationsSchema)])),
likedPosts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostLikesRelationsSchema)])),
likedStories: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryLikesRelationsSchema)])),
taggedInPosts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
taggedInStories: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)])),
following: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
follows: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
blockedBy: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
blockedUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)]))})



export type TReadUserRelationsSchemaOutput = v.InferOutput<typeof ReadUserRelationsSchema>;
export type TReadUserRelationsSchemaInput = v.InferInput<typeof ReadUserRelationsSchema>;
