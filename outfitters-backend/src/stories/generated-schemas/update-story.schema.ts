import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { AccountStatus } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
const UpdateStorySchema = v.pipe(
	v.object({
		background: v.nullish(v.string()),
		text: v.nullish(v.string()),
		media: v.nullish(
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
			v.union([v.array(v.object({ id: v.number() })), v.array(v.object({ userId: v.number(), storyId: v.number() }))]),
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
		postedById: v.optional(v.number()),
		taggedProductsCount: v.optional(v.number()),
		taggedUsersCount: v.optional(v.number()),
		isLiked: v.optional(v.boolean()),
		isViewed: v.optional(v.boolean()),
	}),
	v.metadata({
		[modelSymbol]: 'StoryEntity',
		media: 'MediaEntity',
		taggedProducts: 'TaggedProductEntity',
		postedBy: 'UserEntity',
		taggedUsers: 'UserEntity',
		likedByUsers: 'StoryLikesEntity',
		shares: 'MessageEntity',
	}),
);
export default UpdateStorySchema;

export type TUpdateStorySchemaInput = v.InferInput<typeof UpdateStorySchema>;
export type TUpdateStorySchemaOutput = v.InferOutput<typeof UpdateStorySchema>;
