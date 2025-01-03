import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { PromotionStatusEnum } from '../../promotions/entities/enums';
const CreateCategorySchema = v.pipe(
	v.object({
		name: v.string(),
		isArchived: v.boolean(),
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
		subCategories: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						name: v.string(),
						isArchived: v.boolean(),
						superCategoryId: v.nullish(v.number()),
						test: v.nullish(v.any()),
					}),
				),
			]),
		),
		superCategory: v.nullish(
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
		superCategoryId: v.nullish(v.number()),
		products: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						isArchived: v.boolean(),
						title: v.nullish(v.string()),
						description: v.nullish(v.string()),
						basePrice: v.nullish(v.number()),
						sku: v.nullish(v.string()),
						currency: v.nullish(v.string()),
						stock: v.number(),
						lastStockUpdate: v.nullish(
							v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						),
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
			v.union([
				v.array(
					v.object({
						title: v.string(),
						start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						status: v.enum(PromotionStatusEnum),
					}),
				),
			]),
		),
		test: v.nullish(v.any()),
	}),
	v.metadata({
		[modelSymbol]: 'CategoryEntity',
		media: 'MediaEntity',
		subCategories: 'CategoryEntity',
		superCategory: 'CategoryEntity',
		products: 'ProductEntity',
		categorybrandProfiles: 'BrandProfileEntity',
		subCategoriesBrandProfiles: 'BrandProfileEntity',
		seasonalPromotions: 'SeasonalPromotionEntity',
	}),
);
export default CreateCategorySchema;

export type TCreateCategorySchemaInput = v.InferInput<typeof CreateCategorySchema>;
export type TCreateCategorySchemaOutput = v.InferOutput<typeof CreateCategorySchema>;
