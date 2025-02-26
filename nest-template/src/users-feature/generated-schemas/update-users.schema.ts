import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateUsersSchema = v.pipe(
	v.object({
		username: v.optional(v.pipe(v.string(), v.maxLength(255))),
		email: v.optional(v.pipe(v.string(), v.maxLength(255))),
		password: v.optional(v.pipe(v.string(), v.maxLength(255))),
		role: v.optional(v.pipe(v.string(), v.maxLength(50))),
		seller_products: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						seller_id: v.nullish(v.number()),
						name: v.pipe(v.string(), v.maxLength(255)),
						description: v.nullish(v.string()),
						price: v.number(),
						stock: v.number(),
					}),
				),
			]),
		),
		user_orders: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						user_id: v.nullish(v.number()),
						total_amount: v.number(),
						order_status: v.pipe(v.string(), v.maxLength(50)),
					}),
				),
			]),
		),
		user_reviews: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						product_id: v.nullish(v.number()),
						user_id: v.nullish(v.number()),
						rating: v.number(),
						comment: v.nullish(v.string()),
					}),
				),
			]),
		),
		user_cart_items: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						user_id: v.nullish(v.number()),
						product_id: v.nullish(v.number()),
						quantity: v.number(),
						added_at: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
					}),
				),
			]),
		),
	}),
	v.metadata({
		[modelSymbol]: 'UsersEntity',
		seller_products: 'ProductsEntity',
		user_orders: 'OrdersEntity',
		user_reviews: 'ReviewsEntity',
		user_cart_items: 'Cart_itemsEntity',
	}),
);
export default UpdateUsersSchema;

export type TUpdateUsersSchemaInput = v.InferInput<typeof UpdateUsersSchema>;
export type TUpdateUsersSchemaOutput = v.InferOutput<typeof UpdateUsersSchema>;
