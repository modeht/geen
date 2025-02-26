import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateOrder_itemsSchema = v.pipe(
	v.object({
		order_id: v.nullish(v.number()),
		order_item_order: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					user_id: v.nullish(v.number()),
					total_amount: v.number(),
					order_status: v.pipe(v.string(), v.maxLength(50)),
				}),
			]),
		),
		product_id: v.nullish(v.number()),
		order_item_product: v.nullish(
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
		unit_price: v.optional(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'Order_itemsEntity',
		order_item_order: 'OrdersEntity',
		order_item_product: 'ProductsEntity',
	}),
);
export default UpdateOrder_itemsSchema;

export type TUpdateOrder_itemsSchemaInput = v.InferInput<typeof UpdateOrder_itemsSchema>;
export type TUpdateOrder_itemsSchemaOutput = v.InferOutput<typeof UpdateOrder_itemsSchema>;
