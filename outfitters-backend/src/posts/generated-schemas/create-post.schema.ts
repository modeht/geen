import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { AccountStatus } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
const CreatePostSchema = v.pipe(
	v.object({
		caption: v.nullish(v.string()),
		media: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						mimetype: v.nullish(v.string()),
						url: v.nullish(v.string()),
						size: v.nullish(v.number()),
						width: v.nullish(v.number()),
						height: v.nullish(v.number()),
					}),
				),
			]),
		),
		thumbnail: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					mimetype: v.nullish(v.string()),
					url: v.nullish(v.string()),
					size: v.nullish(v.number()),
					width: v.nullish(v.number()),
					height: v.nullish(v.number()),
				}),
			]),
		),
		taggedProducts: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						productId: v.nullish(v.number()),
						postId: v.nullish(v.number()),
						storyId: v.nullish(v.number()),
						affiliationLinkId: v.nullish(v.number()),
					}),
				),
			]),
		),
		postedBy: v.nullish(
			v.union([
				v.object({ id: v.number() }),
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
			]),
		),
		postedById: v.number(),
		taggedUsers: v.nullish(
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
		likedByUsers: v.nullish(
			v.union([v.array(v.object({ id: v.number() })), v.array(v.object({ userId: v.number(), postId: v.number() }))]),
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
		shares: v.nullish(
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
		savedInCollections: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({ savedCollectionId: v.number(), productId: v.number(), postId: v.number(), userId: v.number() }),
				),
			]),
		),
		thumbnailId: v.nullish(v.number()),
		likesCount: v.number(),
		commentsCount: v.number(),
		taggedProductsCount: v.number(),
		taggedUsersCount: v.number(),
		isLiked: v.optional(v.boolean()),
	}),
	v.metadata({
		[modelSymbol]: 'PostEntity',
		media: 'MediaEntity',
		thumbnail: 'MediaEntity',
		taggedProducts: 'TaggedProductEntity',
		postedBy: 'UserEntity',
		taggedUsers: 'UserEntity',
		likedByUsers: 'PostLikesEntity',
		comments: 'CommentEntity',
		shares: 'MessageEntity',
		savedInCollections: 'SavedCollectionItemEntity',
	}),
);
export default CreatePostSchema;

export type TCreatePostSchemaInput = v.InferInput<typeof CreatePostSchema>;
export type TCreatePostSchemaOutput = v.InferOutput<typeof CreatePostSchema>;
