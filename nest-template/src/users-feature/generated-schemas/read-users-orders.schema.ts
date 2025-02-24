import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';

export class ReadUsersOrders {
	username?: OrderDirectionEnum;
	email?: OrderDirectionEnum;
	password_hash?: OrderDirectionEnum;
}

const ReadUsersOrdersSchema: v.GenericSchema<ReadUsersOrders> = v.object({
	username: v.optional(OrderDirectionSchema),
	email: v.optional(OrderDirectionSchema),
	password_hash: v.optional(OrderDirectionSchema),
});

export default ReadUsersOrdersSchema;

export type TReadUsersOrdersSchemaOutput = v.InferOutput<typeof ReadUsersOrdersSchema>;
export type TReadUsersOrdersSchemaInput = v.InferInput<typeof ReadUsersOrdersSchema>;
