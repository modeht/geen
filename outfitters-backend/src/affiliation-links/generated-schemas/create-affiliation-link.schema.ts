import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { GenderEnum } from '../../users/entities/shopper-profile.entity';
const CreateAffiliationLinkSchema = v.pipe(
	v.object({
		deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
		test: v.any(),
		isDisabled: v.boolean(),
		url: v.string(),
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
		cartItems: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						quantity: v.nullish(v.number()),
						cartId: v.number(),
						productId: v.number(),
						variantId: v.number(),
						affiliationLinkId: v.number(),
						totalPrice: v.number(),
						totalDiscountedPrice: v.number(),
						promoCodeApplied: v.boolean(),
						appliedpromotionsIds: v.array(v.number()),
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
		productId: v.number(),
		shopperId: v.number(),
	}),
	v.metadata({
		[modelSymbol]: 'AffiliationLinkEntity',
		taggedProducts: 'TaggedProductEntity',
		cartItems: 'CartItemsEntity',
		affiliationLinkTracking: 'AffiliationLinkTrackingEntity',
		shopperProfile: 'ShopperProfileEntity',
		product: 'ProductEntity',
	}),
);
export default CreateAffiliationLinkSchema;

export type TCreateAffiliationLinkSchemaInput = v.InferInput<typeof CreateAffiliationLinkSchema>;
export type TCreateAffiliationLinkSchemaOutput = v.InferOutput<typeof CreateAffiliationLinkSchema>;
