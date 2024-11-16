import * as v from 'valibot';

export const CreateCategorySchema = v.pipe(
	v.object({
		name: v.string(),
		isArchived: v.boolean(),
		media: v.union([
			v.number(),
			v.object({
				mimetype: v.optional(v.string()),
				url: v.optional(v.string()),
				size: v.optional(v.number()),
				width: v.optional(v.number()),
				height: v.optional(v.number()),
			}),
		]),
		subCategories: v.nullish(
			v.union([
				v.array(v.number()),
				v.array(
					v.object({
						name: v.string(),
						isArchived: v.boolean(),
						superCategoryId: v.optional(v.number()),
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
					superCategoryId: v.optional(v.number()),
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
						title: v.optional(v.string()),
						description: v.optional(v.string()),
						basePrice: v.optional(v.number()),
						sku: v.optional(v.string()),
						currency: v.optional(v.string()),
						stock: v.number(),
						isOutOfStock: v.boolean(),
						isFeatured: v.boolean(),
						deliveryEstimationInDays: v.number(),
						brandId: v.optional(v.number()),
						categoryId: v.optional(v.number()),
						subCategoryId: v.optional(v.number()),
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
						storeName: v.optional(v.string()),
						brandName: v.optional(v.string()),
						storeBio: v.optional(v.string()),
						website: v.optional(v.string()),
						isPublished: v.boolean(),
						shippingCost: v.optional(v.number()),
						currency: v.optional(v.string()),
						brandManagerFullName: v.optional(v.string()),
						logoId: v.optional(v.number()),
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
						storeName: v.optional(v.string()),
						brandName: v.optional(v.string()),
						storeBio: v.optional(v.string()),
						website: v.optional(v.string()),
						isPublished: v.boolean(),
						shippingCost: v.optional(v.number()),
						currency: v.optional(v.string()),
						brandManagerFullName: v.optional(v.string()),
						logoId: v.optional(v.number()),
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
type t = v.InferInput<typeof CreateCategorySchema>;
try {
	const check = v.parse(
		CreateCategorySchema,
		{
			name: 'asd',
			isArchived: true,
			media: 1,
			// superCategoryId: null,
		} as t,
		{
			abortEarly: true,
			abortPipeEarly: true,
		},
	);
	console.log(check);
	console.dir(CreateCategorySchema.pipe.find((p) => p.kind === 'metadata')?.metadata, {
		depth: null,
	});
} catch (error) {
	console.dir(error, { depth: null });
}
