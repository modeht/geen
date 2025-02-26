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
	order_id?: OrderDirectionEnum;
	order_item_order?: ReadOrdersOrders | OrderDirectionEnum;
	product_id?: OrderDirectionEnum;
	order_item_product?: ReadProductsOrders | OrderDirectionEnum;
	quantity?: OrderDirectionEnum;
	unit_price?: OrderDirectionEnum;
}

const ReadOrder_itemsOrdersSchema: v.GenericSchema<ReadOrder_itemsOrders> = v.object({
	order_id: v.optional(OrderDirectionSchema),
	order_item_order: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrdersOrdersSchema)])),
	product_id: v.optional(OrderDirectionSchema),
	order_item_product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductsOrdersSchema)])),
	quantity: v.optional(OrderDirectionSchema),
	unit_price: v.optional(OrderDirectionSchema),
});

export default ReadOrder_itemsOrdersSchema;

export type TReadOrder_itemsOrdersSchemaOutput = v.InferOutput<typeof ReadOrder_itemsOrdersSchema>;
export type TReadOrder_itemsOrdersSchemaInput = v.InferInput<typeof ReadOrder_itemsOrdersSchema>;
