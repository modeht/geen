import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateProductsSchema = v.pipe(
	v.object({
		seller_id: v.nullish(v.number()),
		product_seller: v.nullish(
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
		name: v.optional(v.pipe(v.string(), v.maxLength(255))),
		description: v.nullish(v.string()),
		price: v.optional(v.number()),
		stock: v.optional(v.number()),
		product_order_items: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						order_id: v.nullish(v.number()),
						product_id: v.nullish(v.number()),
						quantity: v.number(),
						unit_price: v.number(),
					}),
				),
			]),
		),
		product_reviews: v.nullish(
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
		product_cart_items: v.nullish(
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
		[modelSymbol]: 'ProductsEntity',
		product_seller: 'UsersEntity',
		product_order_items: 'Order_itemsEntity',
		product_reviews: 'ReviewsEntity',
		product_cart_items: 'Cart_itemsEntity',
	}),
);
export default UpdateProductsSchema;

export type TUpdateProductsSchemaInput = v.InferInput<typeof UpdateProductsSchema>;
export type TUpdateProductsSchemaOutput = v.InferOutput<typeof UpdateProductsSchema>;
