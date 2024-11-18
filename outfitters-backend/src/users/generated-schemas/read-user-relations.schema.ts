import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import { AccountStatus } from '../entities/user.entity';
import {
	ReadShopperProfileRelationsSchema,
	ReadShopperProfileRelations,
} from './read-shopper-profile-relations.schema';
import {
	ReadBrandProfileRelationsSchema,
	ReadBrandProfileRelations,
} from './read-brand-profile-relations.schema';
import {
	ReadCommentRelationsSchema,
	ReadCommentRelations,
} from '../../comments/generated-schemas/read-comment-relations.schema';
import {
	ReadAffiliationLinkTrackingRelationsSchema,
	ReadAffiliationLinkTrackingRelations,
} from '../../affiliation-links/generated-schemas/read-affiliation-link-tracking-relations.schema';
import {
	ReadNotificationRelationsSchema,
	ReadNotificationRelations,
} from '../../notifications/generated-schemas/read-notification-relations.schema';
import {
	ReadConversationRelationsSchema,
	ReadConversationRelations,
} from '../../conversations/generated-schemas/read-conversation-relations.schema';
import {
	ReadMessageRelationsSchema,
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';
import {
	ReadPostRelationsSchema,
	ReadPostRelations,
} from '../../posts/generated-schemas/read-post-relations.schema';
import {
	ReadStoryRelationsSchema,
	ReadStoryRelations,
} from '../../stories/generated-schemas/read-story-relations.schema';
import {
	ReadSavedCollectionRelationsSchema,
	ReadSavedCollectionRelations,
} from '../../saved-collections/generated-schemas/read-saved-collection-relations.schema';
import {
	ReadRecentSearchesRelationsSchema,
	ReadRecentSearchesRelations,
} from '../../search/generated-schemas/read-recent-searches-relations.schema';
import {
	ReadPostLikesRelationsSchema,
	ReadPostLikesRelations,
} from '../../posts/generated-schemas/read-post-likes-relations.schema';
import {
	ReadStoryLikesRelationsSchema,
	ReadStoryLikesRelations,
} from '../../stories/generated-schemas/read-story-likes-relations.schema';

import { LanguageEnum } from '../../../lib/enums';
export class ReadUserRelations {
	status?: AccountStatus | null | undefined;
	defaultLang?: LanguageEnum | null | undefined;
	shopperProfile?: ReadShopperProfileRelations | boolean | null | undefined;
	brandProfile?: ReadBrandProfileRelations | boolean | null | undefined;
	comments?: ReadCommentRelations | boolean | null | undefined;
	affiliationLinkTracking?:
		| ReadAffiliationLinkTrackingRelations
		| boolean
		| null
		| undefined;
	notifications?: ReadNotificationRelations | boolean | null | undefined;
	initiatedConversations?: ReadConversationRelations | boolean | null | undefined;
	receivedConversations?: ReadConversationRelations | boolean | null | undefined;
	sentMessages?: ReadMessageRelations | boolean | null | undefined;
	receivedMessages?: ReadMessageRelations | boolean | null | undefined;
	posts?: ReadPostRelations | boolean | null | undefined;
	stories?: ReadStoryRelations | boolean | null | undefined;
	savedCollections?: ReadSavedCollectionRelations | boolean | null | undefined;
	recentSearches?: ReadRecentSearchesRelations | boolean | null | undefined;
	likedPosts?: ReadPostLikesRelations | boolean | null | undefined;
	likedStories?: ReadStoryLikesRelations | boolean | null | undefined;
	taggedInPosts?: ReadPostRelations | boolean | null | undefined;
	taggedInStories?: ReadStoryRelations | boolean | null | undefined;
	following?: ReadUserRelations | boolean | null | undefined;
	follows?: ReadUserRelations | boolean | null | undefined;
	blockedBy?: ReadUserRelations | boolean | null | undefined;
	blockedUsers?: ReadUserRelations | boolean | null | undefined;
}

export const ReadUserRelationsSchema: v.GenericSchema<ReadUserRelations> = v.object({
	status: v.nullish(v.enum(AccountStatus)),
	defaultLang: v.nullish(v.enum(LanguageEnum)),
	shopperProfile: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)]),
	),
	brandProfile: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)]),
	),
	comments: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCommentRelationsSchema)])),
	affiliationLinkTracking: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkTrackingRelationsSchema)]),
	),
	notifications: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadNotificationRelationsSchema)]),
	),
	initiatedConversations: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadConversationRelationsSchema)]),
	),
	receivedConversations: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadConversationRelationsSchema)]),
	),
	sentMessages: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)]),
	),
	receivedMessages: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)]),
	),
	posts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
	stories: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)])),
	savedCollections: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadSavedCollectionRelationsSchema)]),
	),
	recentSearches: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadRecentSearchesRelationsSchema)]),
	),
	likedPosts: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadPostLikesRelationsSchema)]),
	),
	likedStories: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadStoryLikesRelationsSchema)]),
	),
	taggedInPosts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
	taggedInStories: v.nullish(
		v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)]),
	),
	following: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
	follows: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
	blockedBy: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
	blockedUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
});

export type TReadUserRelationsSchemaOutput = v.InferOutput<
	typeof ReadUserRelationsSchema
>;
export type TReadUserRelationsSchemaInput = v.InferInput<typeof ReadUserRelationsSchema>;
