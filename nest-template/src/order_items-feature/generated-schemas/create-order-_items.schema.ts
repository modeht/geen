import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateOrder_itemsSchema = v.pipe(
	v.object({
		order_id: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					total_amount: v.number(),
					placed_at: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
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
		quantity: v.number(),
		price_at_purchase: v.number(),
	}),
	v.metadata({ [modelSymbol]: 'Order_itemsEntity', order_id: 'OrdersEntity', product_id: 'ProductsEntity' }),
);
export default CreateOrder_itemsSchema;

export type TCreateOrder_itemsSchemaInput = v.InferInput<typeof CreateOrder_itemsSchema>;
export type TCreateOrder_itemsSchemaOutput = v.InferOutput<typeof CreateOrder_itemsSchema>;
