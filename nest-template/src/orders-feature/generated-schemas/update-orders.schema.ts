import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateOrdersSchema = v.pipe(
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
		total_amount: v.optional(v.number()),
		placed_at: v.optional(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
	}),
	v.metadata({ [modelSymbol]: 'OrdersEntity', user_id: 'UsersEntity' }),
);
export default UpdateOrdersSchema;

export type TUpdateOrdersSchemaInput = v.InferInput<typeof UpdateOrdersSchema>;
export type TUpdateOrdersSchemaOutput = v.InferOutput<typeof UpdateOrdersSchema>;
