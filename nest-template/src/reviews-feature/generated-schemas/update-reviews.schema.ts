import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateReviewsSchema = v.pipe(
	v.object({
		user_id: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					username: v.pipe(v.string(), v.maxLength(50)),
					email: v.pipe(v.string(), v.maxLength(100)),
					password_hash: v.pipe(v.string(), v.maxLength(255)),
				}),
			]),
		),
		product_id: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					name: v.pipe(v.string(), v.maxLength(100)),
					description: v.nullish(v.string()),
					price: v.number(),
					inventory_count: v.number(),
				}),
			]),
		),
		rating: v.optional(v.number()),
		review_text: v.nullish(v.string()),
	}),
	v.metadata({ [modelSymbol]: 'ReviewsEntity', user_id: 'UsersEntity', product_id: 'ProductsEntity' }),
);
export default UpdateReviewsSchema;

export type TUpdateReviewsSchemaInput = v.InferInput<typeof UpdateReviewsSchema>;
export type TUpdateReviewsSchemaOutput = v.InferOutput<typeof UpdateReviewsSchema>;
