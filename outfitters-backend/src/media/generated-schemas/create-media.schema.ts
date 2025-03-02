import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { GenderEnum } from '../../users/entities/shopper-profile.entity';
const CreateMediaSchema = v.pipe(
	v.object({
		preference: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({ name: v.nullish(v.string()), mediaId: v.nullish(v.number()) }),
			]),
		),
		collectionCover: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					name: v.nullish(v.string()),
					isFeatured: v.boolean(),
					isPublic: v.boolean(),
					brandId: v.nullish(v.number()),
				}),
			]),
		),
		user: v.nullish(
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
		brandStoreCover: v.nullish(
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
		brandStoreLogo: v.nullish(
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
		category: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					name: v.string(),
					isArchived: v.boolean(),
					superCategoryId: v.nullish(v.number()),
					test: v.nullish(v.any()),
				}),
			]),
		),
		country: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					name: v.string(),
					code: v.string(),
					dialCode: v.string(),
					isSupported: v.boolean(),
					brands: v.any(),
					iconId: v.number(),
				}),
			]),
		),
		postThumbnail: v.nullish(
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
		productVariant: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					isArchived: v.boolean(),
					stock: v.number(),
					price: v.nullish(v.number()),
					lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					sku: v.nullish(v.string()),
					mainProductId: v.nullish(v.number()),
				}),
			]),
		),
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
		review: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					stars: v.nullish(v.number()),
					comment: v.nullish(v.string()),
					productId: v.number(),
					shopperId: v.number(),
				}),
			]),
		),
		mimetype: v.nullish(v.string()),
		url: v.nullish(v.string()),
		size: v.nullish(v.number()),
		width: v.nullish(v.number()),
		height: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'MediaEntity',
		preference: 'PreferenceEntity',
		collectionCover: 'CollectionEntity',
		user: 'ShopperProfileEntity',
		story: 'StoryEntity',
		brandStoreCover: 'BrandProfileEntity',
		brandStoreLogo: 'BrandProfileEntity',
		category: 'CategoryEntity',
		country: 'CountryEntity',
		postThumbnail: 'PostEntity',
		product: 'ProductEntity',
		productVariant: 'ProductVariantEntity',
		message: 'MessageEntity',
		post: 'PostEntity',
		review: 'ProductReviewEntity',
	}),
);
export default CreateMediaSchema;

export type TCreateMediaSchemaInput = v.InferInput<typeof CreateMediaSchema>;
export type TCreateMediaSchemaOutput = v.InferOutput<typeof CreateMediaSchema>;
