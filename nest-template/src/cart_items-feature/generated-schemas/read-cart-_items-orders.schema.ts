import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUsersOrdersSchema, { ReadUsersOrders } from '../../users-feature/generated-schemas/read-users-orders.schema';
import ReadProductsOrdersSchema, {
	ReadProductsOrders,
} from '../../products-feature/generated-schemas/read-products-orders.schema';

export class ReadCart_itemsOrders {
	user_id?: OrderDirectionEnum;
	cart_item_user?: ReadUsersOrders | OrderDirectionEnum;
	product_id?: OrderDirectionEnum;
	cart_item_product?: ReadProductsOrders | OrderDirectionEnum;
	quantity?: OrderDirectionEnum;
	added_at?: OrderDirectionEnum;
}

const ReadCart_itemsOrdersSchema: v.GenericSchema<ReadCart_itemsOrders> = v.object({
	user_id: v.optional(OrderDirectionSchema),
	cart_item_user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUsersOrdersSchema)])),
	product_id: v.optional(OrderDirectionSchema),
	cart_item_product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductsOrdersSchema)])),
	quantity: v.optional(OrderDirectionSchema),
	added_at: v.optional(OrderDirectionSchema),
});

export default ReadCart_itemsOrdersSchema;

export type TReadCart_itemsOrdersSchemaOutput = v.InferOutput<typeof ReadCart_itemsOrdersSchema>;
export type TReadCart_itemsOrdersSchemaInput = v.InferInput<typeof ReadCart_itemsOrdersSchema>;
