import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { AccountStatus } from '../entities/user.entity';
import ReadShopperProfileRelationsSchema, { ReadShopperProfileRelations } from './read-shopper-profile-relations.schema'
import ReadBrandProfileRelationsSchema, { ReadBrandProfileRelations } from './read-brand-profile-relations.schema'
import ReadCommentRelationsSchema, { ReadCommentRelations } from '../../comments/generated-schemas/read-comment-relations.schema'
import ReadAffiliationLinkTrackingRelationsSchema, { ReadAffiliationLinkTrackingRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-tracking-relations.schema'
import ReadNotificationRelationsSchema, { ReadNotificationRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'
import ReadConversationRelationsSchema, { ReadConversationRelations } from '../../conversations/generated-schemas/read-conversation-relations.schema'
import ReadMessageRelationsSchema, { ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import ReadPostRelationsSchema, { ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import ReadStoryRelationsSchema, { ReadStoryRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import ReadSavedCollectionRelationsSchema, { ReadSavedCollectionRelations } from '../../saved-collections/generated-schemas/read-saved-collection-relations.schema'
import ReadRecentSearchesRelationsSchema, { ReadRecentSearchesRelations } from '../../search/generated-schemas/read-recent-searches-relations.schema'
import ReadPostLikesRelationsSchema, { ReadPostLikesRelations } from '../../posts/generated-schemas/read-post-likes-relations.schema'
import ReadStoryLikesRelationsSchema, { ReadStoryLikesRelations } from '../../stories/generated-schemas/read-story-likes-relations.schema'


import { LanguageEnum } from '../../../lib/enums'
export class ReadUserRelations {status?: AccountStatus | null;
defaultLang?: LanguageEnum | null;
shopperProfile?: ReadShopperProfileRelations | string | boolean;
brandProfile?: ReadBrandProfileRelations | string | boolean;
comments?: ReadCommentRelations | string | boolean;
affiliationLinkTracking?: ReadAffiliationLinkTrackingRelations | string | boolean;
notifications?: ReadNotificationRelations | string | boolean;
initiatedConversations?: ReadConversationRelations | string | boolean;
receivedConversations?: ReadConversationRelations | string | boolean;
sentMessages?: ReadMessageRelations | string | boolean;
receivedMessages?: ReadMessageRelations | string | boolean;
posts?: ReadPostRelations | string | boolean;
stories?: ReadStoryRelations | string | boolean;
savedCollections?: ReadSavedCollectionRelations | string | boolean;
recentSearches?: ReadRecentSearchesRelations | string | boolean;
likedPosts?: ReadPostLikesRelations | string | boolean;
likedStories?: ReadStoryLikesRelations | string | boolean;
taggedInPosts?: ReadPostRelations | string | boolean;
taggedInStories?: ReadStoryRelations | string | boolean;
following?: ReadUserRelations | string | boolean;
follows?: ReadUserRelations | string | boolean;
blockedBy?: ReadUserRelations | string | boolean;
blockedUsers?: ReadUserRelations | string | boolean}

const ReadUserRelationsSchema: v.GenericSchema<ReadUserRelations> = v.object({status: v.nullish(v.enum(AccountStatus)),
defaultLang: v.nullish(v.enum(LanguageEnum)),
shopperProfile: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadShopperProfileRelationsSchema)])),
brandProfile: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
comments: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCommentRelationsSchema)])),
affiliationLinkTracking: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadAffiliationLinkTrackingRelationsSchema)])),
notifications: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadNotificationRelationsSchema)])),
initiatedConversations: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadConversationRelationsSchema)])),
receivedConversations: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadConversationRelationsSchema)])),
sentMessages: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)])),
receivedMessages: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)])),
posts: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)])),
stories: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryRelationsSchema)])),
savedCollections: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadSavedCollectionRelationsSchema)])),
recentSearches: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadRecentSearchesRelationsSchema)])),
likedPosts: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostLikesRelationsSchema)])),
likedStories: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryLikesRelationsSchema)])),
taggedInPosts: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)])),
taggedInStories: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryRelationsSchema)])),
following: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
follows: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
blockedBy: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
blockedUsers: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)]))});

export default ReadUserRelationsSchema;




export type TReadUserRelationsSchemaOutput = v.InferOutput<typeof ReadUserRelationsSchema>;
export type TReadUserRelationsSchemaInput = v.InferInput<typeof ReadUserRelationsSchema>;
