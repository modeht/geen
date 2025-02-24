import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUsersOrdersSchema, { ReadUsersOrders } from '../../users-feature/generated-schemas/read-users-orders.schema';

export class ReadOrdersOrders {
	user_id?: ReadUsersOrders | OrderDirectionEnum;
	total_amount?: OrderDirectionEnum;
	placed_at?: OrderDirectionEnum;
}

const ReadOrdersOrdersSchema: v.GenericSchema<ReadOrdersOrders> = v.object({
	user_id: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUsersOrdersSchema)])),
	total_amount: v.optional(OrderDirectionSchema),
	placed_at: v.optional(OrderDirectionSchema),
});

export default ReadOrdersOrdersSchema;

export type TReadOrdersOrdersSchemaOutput = v.InferOutput<typeof ReadOrdersOrdersSchema>;
export type TReadOrdersOrdersSchemaInput = v.InferInput<typeof ReadOrdersOrdersSchema>;
