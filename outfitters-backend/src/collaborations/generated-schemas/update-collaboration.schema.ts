import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import { GenderEnum } from '../../users/entities/shopper-profile.entity';
import { NotificationType } from '../../notifications/entities/notification.entity';
const UpdateCollaborationSchema = v.pipe(
	v.object({
		message: v.nullish(
			v.union([
				v.object({ id: v.number() }),
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
		status: v.optional(v.enum(CollaborationStatusEnum)),
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
		brandId: v.nullish(v.number()),
		shopperId: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'CollaborationEntity',
		message: 'MessageEntity',
		brandProfile: 'BrandProfileEntity',
		shopperProfile: 'ShopperProfileEntity',
		notifications: 'NotificationEntity',
	}),
);
export default UpdateCollaborationSchema;

export type TUpdateCollaborationSchemaInput = v.InferInput<typeof UpdateCollaborationSchema>;
export type TUpdateCollaborationSchemaOutput = v.InferOutput<typeof UpdateCollaborationSchema>;
