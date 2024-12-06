import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { CollaborationStatusEnum } from '../../collaborations/entities/collaboration.entity';
import { AccountStatus } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
const CreateMessageSchema = v.pipe(
	v.object({
		readAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
		content: v.nullish(v.string()),
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
		reaction: v.nullish(v.string()),
		collaboration: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					status: v.enum(CollaborationStatusEnum),
					brandId: v.nullish(v.number()),
					shopperId: v.nullish(v.number()),
				}),
			]),
		),
		post: v.nullish(
			v.union([
				v.object({ id: v.number() }),
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
			]),
		),
		story: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					background: v.nullish(v.string()),
					text: v.nullish(v.string()),
					postedById: v.number(),
					taggedProductsCount: v.number(),
					taggedUsersCount: v.number(),
					isLiked: v.optional(v.boolean()),
					isViewed: v.optional(v.boolean()),
				}),
			]),
		),
		product: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					isArchived: v.boolean(),
					title: v.nullish(v.string()),
					description: v.nullish(v.string()),
					basePrice: v.nullish(v.number()),
					sku: v.nullish(v.string()),
					currency: v.nullish(v.string()),
					stock: v.number(),
					lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					isOutOfStock: v.boolean(),
					isFeatured: v.boolean(),
					deliveryEstimationInDays: v.number(),
					brandId: v.nullish(v.number()),
					categoryId: v.nullish(v.number()),
					subCategoryId: v.nullish(v.number()),
					averageRating: v.number(),
					isSaved: v.boolean(),
				}),
			]),
		),
		conversation: v.union([
			v.object({ id: v.number() }),
			v.object({
				isSupport: v.boolean(),
				archivedByFrom: v.boolean(),
				archivedByTo: v.boolean(),
				fromId: v.number(),
				toId: v.number(),
				isCollaboration: v.boolean(),
			}),
		]),
		from: v.nullish(
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
		to: v.nullish(
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
		comment: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					content: v.string(),
					level: v.number(),
					userId: v.number(),
					replyToId: v.optional(v.number()),
					postId: v.optional(v.number()),
					repliesDepth: v.number(),
				}),
			]),
		),
		fromId: v.number(),
		toId: v.number(),
		conversationId: v.number(),
		collaborationId: v.nullish(v.number()),
		postId: v.nullish(v.number()),
		storyId: v.nullish(v.number()),
		commentId: v.nullish(v.number()),
		productId: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'MessageEntity',
		media: 'MediaEntity',
		collaboration: 'CollaborationEntity',
		post: 'PostEntity',
		story: 'StoryEntity',
		product: 'ProductEntity',
		conversation: 'ConversationEntity',
		from: 'UserEntity',
		to: 'UserEntity',
		comment: 'CommentEntity',
	}),
);
export default CreateMessageSchema;

export type TCreateMessageSchemaInput = v.InferInput<typeof CreateMessageSchema>;
export type TCreateMessageSchemaOutput = v.InferOutput<typeof CreateMessageSchema>;
