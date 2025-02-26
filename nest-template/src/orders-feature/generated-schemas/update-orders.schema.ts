import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateOrdersSchema = v.pipe(
	v.object({
		user_id: v.nullish(v.number()),
		order_user: v.nullish(
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
		total_amount: v.optional(v.number()),
		order_status: v.optional(v.pipe(v.string(), v.maxLength(50))),
		order_order_items: v.nullish(
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
	}),
	v.metadata({ [modelSymbol]: 'OrdersEntity', order_user: 'UsersEntity', order_order_items: 'Order_itemsEntity' }),
);
export default UpdateOrdersSchema;

export type TUpdateOrdersSchemaInput = v.InferInput<typeof UpdateOrdersSchema>;
export type TUpdateOrdersSchemaOutput = v.InferOutput<typeof UpdateOrdersSchema>;
