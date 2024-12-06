import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

const UpdateSavedCollectionItemSchema = v.pipe(
	v.object({
		savedCollection: v.nullish(
			v.union([v.object({ id: v.number() }), v.object({ name: v.nullish(v.string()), userId: v.number() })]),
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
		savedCollectionId: v.optional(v.number()),
		productId: v.optional(v.number()),
		postId: v.optional(v.number()),
		userId: v.optional(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'SavedCollectionItemEntity',
		savedCollection: 'SavedCollectionEntity',
		product: 'ProductEntity',
		post: 'PostEntity',
	}),
);
export default UpdateSavedCollectionItemSchema;

export type TUpdateSavedCollectionItemSchemaInput = v.InferInput<typeof UpdateSavedCollectionItemSchema>;
export type TUpdateSavedCollectionItemSchemaOutput = v.InferOutput<typeof UpdateSavedCollectionItemSchema>;
