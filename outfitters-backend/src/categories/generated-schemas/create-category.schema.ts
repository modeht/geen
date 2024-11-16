import * as v from 'valibot';

export const CreateCategorySchema = v.pipe(
	v.object({
		name: v.string(),
		isArchived: v.boolean(),
		media: v.union([
			v.number(),
			v.object({
				mimetype: v.nullish(v.string()),
				url: v.nullish(v.string()),
				size: v.nullish(v.number()),
				width: v.nullish(v.number()),
				height: v.nullish(v.number()),
			}),
		]),
		subCategories: v.nullish(
			v.union([
				v.array(v.number()),
				v.array(
					v.object({
						name: v.string(),
						isArchived: v.boolean(),
						superCategoryId: v.nullish(v.number()),
					}),
				),
			]),
		),
		superCategory: v.nullish(
			v.union([
				v.number(),
				v.object({
					name: v.string(),
					isArchived: v.boolean(),
					superCategoryId: v.nullish(v.number()),
				}),
			]),
		),
		superCategoryId: v.nullish(v.number()),
		products: v.nullish(
			v.union([
				v.array(v.number()),
				v.array(
					v.object({
						isArchived: v.boolean(),
						title: v.nullish(v.string()),
						description: v.nullish(v.string()),
						basePrice: v.nullish(v.number()),
						sku: v.nullish(v.string()),
						currency: v.nullish(v.string()),
						stock: v.number(),
						isOutOfStock: v.boolean(),
						isFeatured: v.boolean(),
						deliveryEstimationInDays: v.number(),
						brandId: v.nullish(v.number()),
						categoryId: v.nullish(v.number()),
						subCategoryId: v.nullish(v.number()),
						averageRating: v.number(),
						isSaved: v.boolean(),
					}),
				),
			]),
		),
		categorybrandProfiles: v.nullish(
			v.union([
				v.array(v.number()),
				v.array(
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
				),
			]),
		),
		subCategoriesBrandProfiles: v.nullish(
			v.union([
				v.array(v.number()),
				v.array(
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
				),
			]),
		),
		seasonalPromotions: v.nullish(
			v.union([v.array(v.number()), v.array(v.object({ title: v.string() }))]),
		),
	}),
	v.metadata({
		media: 'MediaEntity',
		subCategories: 'CategoryEntity',
		superCategory: 'CategoryEntity',
		products: 'ProductEntity',
		categorybrandProfiles: 'BrandProfileEntity',
		subCategoriesBrandProfiles: 'BrandProfileEntity',
		seasonalPromotions: 'SeasonalPromotionEntity',
	}),
);

export type TCreateCategorySchema = v.InferInput<typeof CreateCategorySchema>;
