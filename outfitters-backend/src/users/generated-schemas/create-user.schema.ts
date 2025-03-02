import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { AccountStatus } from '../entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
import { GenderEnum } from '../entities/shopper-profile.entity';
import { NotificationType } from '../../notifications/entities/notification.entity';
import { searchMode } from '../../search/entities/recent-searches.entity';
const CreateUserSchema = v.pipe(
	v.object({
		status: v.enum(AccountStatus),
		email: v.nullish(v.string()),
		phone: v.nullish(v.string()),
		password: v.nullish(v.string()),
		firebaseId: v.nullish(v.string()),
		emailVerified: v.nullish(v.boolean()),
		isGoogleSignin: v.nullish(v.boolean()),
		isAppleSignin: v.nullish(v.boolean()),
		defaultLang: v.enum(LanguageEnum),
		shopperProfile: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					username: v.nullish(v.string()),
					fullName: v.nullish(v.string()),
					dateOfBirth: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
					bio: v.string(),
					gender: v.nullish(v.enum(GenderEnum)),
					onboardingStep: v.nullish(v.number()),
					facebookProfileLink: v.nullish(v.string()),
					instagramProfileLink: v.string(),
					tiktokProfileLink: v.string(),
					isOutfitter: v.boolean(),
					isFollowing: v.nullish(v.boolean()),
					hasStory: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
					followingCount: v.nullish(v.number()),
					postsCount: v.nullish(v.number()),
					brandsCount: v.nullish(v.number()),
					engagementCount: v.nullish(v.number()),
				}),
			]),
		),
		brandProfile: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					storeName: v.nullish(v.string()),
					brandName: v.nullish(v.string()),
					storeBio: v.nullish(v.string()),
					website: v.nullish(v.string()),
					isPublished: v.boolean(),
					shippingCost: v.nullish(v.number()),
					currency: v.nullish(v.string()),
					brandManagerFullName: v.nullish(v.string()),
					logoId: v.nullish(v.number()),
					isFollowing: v.nullish(v.boolean()),
					hasStory: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
					followingCount: v.nullish(v.number()),
					postsCount: v.nullish(v.number()),
				}),
			]),
		),
		comments: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						content: v.string(),
						level: v.number(),
						userId: v.number(),
						replyToId: v.optional(v.number()),
						postId: v.optional(v.number()),
						repliesDepth: v.number(),
					}),
				),
			]),
		),
		affiliationLinkTracking: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						referrer: v.nullish(v.string()),
						country: v.string(),
						ipAddress: v.nullish(v.string()),
						userAgent: v.nullish(v.string()),
					}),
				),
			]),
		),
		notifications: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						type: v.enum(NotificationType),
						customContent: v.string(),
						isRead: v.boolean(),
						userId: v.number(),
						collaborationId: v.number(),
						commentId: v.number(),
						promotionId: v.number(),
						productId: v.number(),
					}),
				),
			]),
		),
		initiatedConversations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						isSupport: v.boolean(),
						archivedByFrom: v.boolean(),
						archivedByTo: v.boolean(),
						fromId: v.number(),
						toId: v.number(),
						isCollaboration: v.boolean(),
					}),
				),
			]),
		),
		receivedConversations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						isSupport: v.boolean(),
						archivedByFrom: v.boolean(),
						archivedByTo: v.boolean(),
						fromId: v.number(),
						toId: v.number(),
						isCollaboration: v.boolean(),
					}),
				),
			]),
		),
		sentMessages: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						readAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						content: v.nullish(v.string()),
						reaction: v.nullish(v.string()),
						fromId: v.number(),
						toId: v.number(),
						conversationId: v.number(),
						collaborationId: v.nullish(v.number()),
						postId: v.nullish(v.number()),
						storyId: v.nullish(v.number()),
						commentId: v.nullish(v.number()),
						productId: v.nullish(v.number()),
					}),
				),
			]),
		),
		receivedMessages: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						readAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						content: v.nullish(v.string()),
						reaction: v.nullish(v.string()),
						fromId: v.number(),
						toId: v.number(),
						conversationId: v.number(),
						collaborationId: v.nullish(v.number()),
						postId: v.nullish(v.number()),
						storyId: v.nullish(v.number()),
						commentId: v.nullish(v.number()),
						productId: v.nullish(v.number()),
					}),
				),
			]),
		),
		posts: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						caption: v.nullish(v.string()),
						postedById: v.number(),
						thumbnailId: v.nullish(v.number()),
						likesCount: v.number(),
						commentsCount: v.number(),
						taggedProductsCount: v.number(),
						taggedUsersCount: v.number(),
						isLiked: v.optional(v.boolean()),
					}),
				),
			]),
		),
		stories: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						background: v.nullish(v.string()),
						text: v.nullish(v.string()),
						postedById: v.number(),
						taggedProductsCount: v.number(),
						taggedUsersCount: v.number(),
						isLiked: v.optional(v.boolean()),
						isViewed: v.optional(v.boolean()),
					}),
				),
			]),
		),
		savedCollections: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ name: v.nullish(v.string()), userId: v.number() })),
			]),
		),
		recentSearches: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ keyword: v.nullish(v.string()), mode: v.enum(searchMode), userId: v.number() })),
			]),
		),
		likedPosts: v.nullish(
			v.union([v.array(v.object({ id: v.number() })), v.array(v.object({ userId: v.number(), postId: v.number() }))]),
		),
		likedStories: v.nullish(
			v.union([v.array(v.object({ id: v.number() })), v.array(v.object({ userId: v.number(), storyId: v.number() }))]),
		),
		taggedInPosts: v.nullish(
			v.union([
				v.array(
					v.object({
						caption: v.nullish(v.string()),
						postedById: v.number(),
						thumbnailId: v.nullish(v.number()),
						likesCount: v.number(),
						commentsCount: v.number(),
						taggedProductsCount: v.number(),
						taggedUsersCount: v.number(),
						isLiked: v.optional(v.boolean()),
					}),
				),
			]),
		),
		taggedInStories: v.nullish(
			v.union([
				v.array(
					v.object({
						background: v.nullish(v.string()),
						text: v.nullish(v.string()),
						postedById: v.number(),
						taggedProductsCount: v.number(),
						taggedUsersCount: v.number(),
						isLiked: v.optional(v.boolean()),
						isViewed: v.optional(v.boolean()),
					}),
				),
			]),
		),
		following: v.nullish(
			v.union([
				v.array(
					v.object({
						status: v.enum(AccountStatus),
						email: v.nullish(v.string()),
						phone: v.nullish(v.string()),
						password: v.nullish(v.string()),
						firebaseId: v.nullish(v.string()),
						emailVerified: v.nullish(v.boolean()),
						isGoogleSignin: v.nullish(v.boolean()),
						isAppleSignin: v.nullish(v.boolean()),
						defaultLang: v.enum(LanguageEnum),
						isFollowing: v.nullish(v.boolean()),
						isBlockedBy: v.nullish(v.boolean()),
						followersCount: v.nullish(v.number()),
					}),
				),
			]),
		),
		follows: v.nullish(
			v.union([
				v.array(
					v.object({
						status: v.enum(AccountStatus),
						email: v.nullish(v.string()),
						phone: v.nullish(v.string()),
						password: v.nullish(v.string()),
						firebaseId: v.nullish(v.string()),
						emailVerified: v.nullish(v.boolean()),
						isGoogleSignin: v.nullish(v.boolean()),
						isAppleSignin: v.nullish(v.boolean()),
						defaultLang: v.enum(LanguageEnum),
						isFollowing: v.nullish(v.boolean()),
						isBlockedBy: v.nullish(v.boolean()),
						followersCount: v.nullish(v.number()),
					}),
				),
			]),
		),
		blockedBy: v.nullish(
			v.union([
				v.array(
					v.object({
						status: v.enum(AccountStatus),
						email: v.nullish(v.string()),
						phone: v.nullish(v.string()),
						password: v.nullish(v.string()),
						firebaseId: v.nullish(v.string()),
						emailVerified: v.nullish(v.boolean()),
						isGoogleSignin: v.nullish(v.boolean()),
						isAppleSignin: v.nullish(v.boolean()),
						defaultLang: v.enum(LanguageEnum),
						isFollowing: v.nullish(v.boolean()),
						isBlockedBy: v.nullish(v.boolean()),
						followersCount: v.nullish(v.number()),
					}),
				),
			]),
		),
		blockedUsers: v.nullish(
			v.union([
				v.array(
					v.object({
						status: v.enum(AccountStatus),
						email: v.nullish(v.string()),
						phone: v.nullish(v.string()),
						password: v.nullish(v.string()),
						firebaseId: v.nullish(v.string()),
						emailVerified: v.nullish(v.boolean()),
						isGoogleSignin: v.nullish(v.boolean()),
						isAppleSignin: v.nullish(v.boolean()),
						defaultLang: v.enum(LanguageEnum),
						isFollowing: v.nullish(v.boolean()),
						isBlockedBy: v.nullish(v.boolean()),
						followersCount: v.nullish(v.number()),
					}),
				),
			]),
		),
		isFollowing: v.nullish(v.boolean()),
		isBlockedBy: v.nullish(v.boolean()),
		followersCount: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'UserEntity',
		shopperProfile: 'ShopperProfileEntity',
		brandProfile: 'BrandProfileEntity',
		comments: 'CommentEntity',
		affiliationLinkTracking: 'AffiliationLinkTrackingEntity',
		notifications: 'NotificationEntity',
		initiatedConversations: 'ConversationEntity',
		receivedConversations: 'ConversationEntity',
		sentMessages: 'MessageEntity',
		receivedMessages: 'MessageEntity',
		posts: 'PostEntity',
		stories: 'StoryEntity',
		savedCollections: 'SavedCollectionEntity',
		recentSearches: 'RecentSearchesEntity',
		likedPosts: 'PostLikesEntity',
		likedStories: 'StoryLikesEntity',
		taggedInPosts: 'PostEntity',
		taggedInStories: 'StoryEntity',
		following: 'UserEntity',
		follows: 'UserEntity',
		blockedBy: 'UserEntity',
		blockedUsers: 'UserEntity',
	}),
);
export default CreateUserSchema;

export type TCreateUserSchemaInput = v.InferInput<typeof CreateUserSchema>;
export type TCreateUserSchemaOutput = v.InferOutput<typeof CreateUserSchema>;
