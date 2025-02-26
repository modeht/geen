import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateOrder_itemsSchema = v.pipe(
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
		quantity: v.number(),
		unit_price: v.number(),
	}),
	v.metadata({
		[modelSymbol]: 'Order_itemsEntity',
		order_item_order: 'OrdersEntity',
		order_item_product: 'ProductsEntity',
	}),
);
export default CreateOrder_itemsSchema;

export type TCreateOrder_itemsSchemaInput = v.InferInput<typeof CreateOrder_itemsSchema>;
export type TCreateOrder_itemsSchemaOutput = v.InferOutput<typeof CreateOrder_itemsSchema>;
