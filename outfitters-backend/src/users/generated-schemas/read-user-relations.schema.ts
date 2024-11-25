import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { AccountStatus } from '../entities/user.entity';
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from './read-shopper-profile-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from './read-brand-profile-relations.schema'
import { ReadCommentRelationsSchema, ReadCommentRelations } from '../../comments/generated-schemas/read-comment-relations.schema'
import { ReadAffiliationLinkTrackingRelationsSchema, ReadAffiliationLinkTrackingRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-tracking-relations.schema'
import { ReadNotificationRelationsSchema, ReadNotificationRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'
import { ReadConversationRelationsSchema, ReadConversationRelations } from '../../conversations/generated-schemas/read-conversation-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import { ReadSavedCollectionRelationsSchema, ReadSavedCollectionRelations } from '../../saved-collections/generated-schemas/read-saved-collection-relations.schema'
import { ReadRecentSearchesRelationsSchema, ReadRecentSearchesRelations } from '../../search/generated-schemas/read-recent-searches-relations.schema'
import { ReadPostLikesRelationsSchema, ReadPostLikesRelations } from '../../posts/generated-schemas/read-post-likes-relations.schema'
import { ReadStoryLikesRelationsSchema, ReadStoryLikesRelations } from '../../stories/generated-schemas/read-story-likes-relations.schema'


import { LanguageEnum } from '../../../lib/enums'
export class ReadUserRelations {status?: AccountStatus | null | undefined;
defaultLang?: LanguageEnum | null | undefined;
shopperProfile?: ReadShopperProfileRelations | string | boolean | undefined;
brandProfile?: ReadBrandProfileRelations | string | boolean | undefined;
comments?: ReadCommentRelations | string | boolean | undefined;
affiliationLinkTracking?: ReadAffiliationLinkTrackingRelations | string | boolean | undefined;
notifications?: ReadNotificationRelations | string | boolean | undefined;
initiatedConversations?: ReadConversationRelations | string | boolean | undefined;
receivedConversations?: ReadConversationRelations | string | boolean | undefined;
sentMessages?: ReadMessageRelations | string | boolean | undefined;
receivedMessages?: ReadMessageRelations | string | boolean | undefined;
posts?: ReadPostRelations | string | boolean | undefined;
stories?: ReadStoryRelations | string | boolean | undefined;
savedCollections?: ReadSavedCollectionRelations | string | boolean | undefined;
recentSearches?: ReadRecentSearchesRelations | string | boolean | undefined;
likedPosts?: ReadPostLikesRelations | string | boolean | undefined;
likedStories?: ReadStoryLikesRelations | string | boolean | undefined;
taggedInPosts?: ReadPostRelations | string | boolean | undefined;
taggedInStories?: ReadStoryRelations | string | boolean | undefined;
following?: ReadUserRelations | string | boolean | undefined;
follows?: ReadUserRelations | string | boolean | undefined;
blockedBy?: ReadUserRelations | string | boolean | undefined;
blockedUsers?: ReadUserRelations | string | boolean | undefined}

export const ReadUserRelationsSchema: v.GenericSchema<ReadUserRelations> = v.object({status: v.nullish(v.enum(AccountStatus)),
defaultLang: v.nullish(v.enum(LanguageEnum)),
shopperProfile: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadShopperProfileRelationsSchema)])),
brandProfile: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
comments: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCommentRelationsSchema)])),
affiliationLinkTracking: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadAffiliationLinkTrackingRelationsSchema)])),
notifications: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadNotificationRelationsSchema)])),
initiatedConversations: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadConversationRelationsSchema)])),
receivedConversations: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadConversationRelationsSchema)])),
sentMessages: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)])),
receivedMessages: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)])),
posts: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)])),
stories: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryRelationsSchema)])),
savedCollections: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadSavedCollectionRelationsSchema)])),
recentSearches: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadRecentSearchesRelationsSchema)])),
likedPosts: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostLikesRelationsSchema)])),
likedStories: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryLikesRelationsSchema)])),
taggedInPosts: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)])),
taggedInStories: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryRelationsSchema)])),
following: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
follows: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
blockedBy: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
blockedUsers: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)]))})



export type TReadUserRelationsSchemaOutput = v.InferOutput<typeof ReadUserRelationsSchema>;
export type TReadUserRelationsSchemaInput = v.InferInput<typeof ReadUserRelationsSchema>;
