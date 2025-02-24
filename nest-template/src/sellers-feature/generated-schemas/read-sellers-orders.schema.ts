import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUsersOrdersSchema, { ReadUsersOrders } from '../../users-feature/generated-schemas/read-users-orders.schema';

export class ReadSellersOrders {
	user_id?: ReadUsersOrders | OrderDirectionEnum;
	store_name?: OrderDirectionEnum;
}

const ReadSellersOrdersSchema: v.GenericSchema<ReadSellersOrders> = v.object({
	user_id: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUsersOrdersSchema)])),
	store_name: v.optional(OrderDirectionSchema),
});

export default ReadSellersOrdersSchema;

export type TReadSellersOrdersSchemaOutput = v.InferOutput<typeof ReadSellersOrdersSchema>;
export type TReadSellersOrdersSchemaInput = v.InferInput<typeof ReadSellersOrdersSchema>;
