import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

const CreateTaggedProductSchema = v.pipe(
	v.object({
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
		affiliationLink: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					isDisabled: v.boolean(),
					t: v.string(),
					url: v.string(),
					productId: v.number(),
					shopperId: v.number(),
				}),
			]),
		),
		productId: v.nullish(v.number()),
		postId: v.nullish(v.number()),
		storyId: v.nullish(v.number()),
		affiliationLinkId: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'TaggedProductEntity',
		product: 'ProductEntity',
		post: 'PostEntity',
		story: 'StoryEntity',
		affiliationLink: 'AffiliationLinkEntity',
	}),
);
export default CreateTaggedProductSchema;

export type TCreateTaggedProductSchemaInput = v.InferInput<typeof CreateTaggedProductSchema>;
export type TCreateTaggedProductSchemaOutput = v.InferOutput<typeof CreateTaggedProductSchema>;
