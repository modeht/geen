import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateCart_itemsSchema = v.pipe(
	v.object({
		user_id: v.nullish(v.number()),
		cart_item_user: v.nullish(
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
		product_id: v.nullish(v.number()),
		cart_item_product: v.nullish(
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
		quantity: v.optional(v.number()),
		added_at: v.optional(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
	}),
	v.metadata({ [modelSymbol]: 'Cart_itemsEntity', cart_item_user: 'UsersEntity', cart_item_product: 'ProductsEntity' }),
);
export default UpdateCart_itemsSchema;

export type TUpdateCart_itemsSchemaInput = v.InferInput<typeof UpdateCart_itemsSchema>;
export type TUpdateCart_itemsSchemaOutput = v.InferOutput<typeof UpdateCart_itemsSchema>;
