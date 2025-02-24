import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadOrdersOrdersSchema, {
	ReadOrdersOrders,
} from '../../orders-feature/generated-schemas/read-orders-orders.schema';
import ReadProductsOrdersSchema, {
	ReadProductsOrders,
} from '../../products-feature/generated-schemas/read-products-orders.schema';

export class ReadOrder_itemsOrders {
	order_id?: ReadOrdersOrders | OrderDirectionEnum;
	product_id?: ReadProductsOrders | OrderDirectionEnum;
	quantity?: OrderDirectionEnum;
	price_at_purchase?: OrderDirectionEnum;
}

const ReadOrder_itemsOrdersSchema: v.GenericSchema<ReadOrder_itemsOrders> = v.object({
	order_id: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrdersOrdersSchema)])),
	product_id: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductsOrdersSchema)])),
	quantity: v.optional(OrderDirectionSchema),
	price_at_purchase: v.optional(OrderDirectionSchema),
});

export default ReadOrder_itemsOrdersSchema;

export type TReadOrder_itemsOrdersSchemaOutput = v.InferOutput<typeof ReadOrder_itemsOrdersSchema>;
export type TReadOrder_itemsOrdersSchemaInput = v.InferInput<typeof ReadOrder_itemsOrdersSchema>;
