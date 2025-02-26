import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUsersOrdersSchema, { ReadUsersOrders } from '../../users-feature/generated-schemas/read-users-orders.schema';
import ReadOrder_itemsOrdersSchema, {
	ReadOrder_itemsOrders,
} from '../../order_items-feature/generated-schemas/read-order-_items-orders.schema';

export class ReadOrdersOrders {
	user_id?: OrderDirectionEnum;
	order_user?: ReadUsersOrders | OrderDirectionEnum;
	total_amount?: OrderDirectionEnum;
	order_status?: OrderDirectionEnum;
	order_order_items?: ReadOrder_itemsOrders | OrderDirectionEnum;
}

const ReadOrdersOrdersSchema: v.GenericSchema<ReadOrdersOrders> = v.object({
	user_id: v.optional(OrderDirectionSchema),
	order_user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUsersOrdersSchema)])),
	total_amount: v.optional(OrderDirectionSchema),
	order_status: v.optional(OrderDirectionSchema),
	order_order_items: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrder_itemsOrdersSchema)])),
});

export default ReadOrdersOrdersSchema;

export type TReadOrdersOrdersSchemaOutput = v.InferOutput<typeof ReadOrdersOrdersSchema>;
export type TReadOrdersOrdersSchemaInput = v.InferInput<typeof ReadOrdersOrdersSchema>;
