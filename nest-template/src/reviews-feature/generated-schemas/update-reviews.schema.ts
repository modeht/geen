import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateReviewsSchema = v.pipe(
	v.object({
		product_id: v.nullish(v.number()),
		review_product: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					seller_id: v.nullish(v.number()),
					name: v.pipe(v.string(), v.maxLength(255)),
					description: v.nullish(v.string()),
					price: v.number(),
					stock: v.number(),
				}),
			]),
		),
		user_id: v.nullish(v.number()),
		review_user: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					username: v.pipe(v.string(), v.maxLength(255)),
					email: v.pipe(v.string(), v.maxLength(255)),
					password: v.pipe(v.string(), v.maxLength(255)),
					role: v.pipe(v.string(), v.maxLength(50)),
				}),
			]),
		),
		rating: v.optional(v.number()),
		comment: v.nullish(v.string()),
	}),
	v.metadata({ [modelSymbol]: 'ReviewsEntity', review_product: 'ProductsEntity', review_user: 'UsersEntity' }),
);
export default UpdateReviewsSchema;

export type TUpdateReviewsSchemaInput = v.InferInput<typeof UpdateReviewsSchema>;
export type TUpdateReviewsSchemaOutput = v.InferOutput<typeof UpdateReviewsSchema>;
