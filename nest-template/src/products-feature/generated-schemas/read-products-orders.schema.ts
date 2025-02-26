import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUsersOrdersSchema, { ReadUsersOrders } from '../../users-feature/generated-schemas/read-users-orders.schema';
import ReadOrder_itemsOrdersSchema, {
	ReadOrder_itemsOrders,
} from '../../order_items-feature/generated-schemas/read-order-_items-orders.schema';
import ReadReviewsOrdersSchema, {
	ReadReviewsOrders,
} from '../../reviews-feature/generated-schemas/read-reviews-orders.schema';
import ReadCart_itemsOrdersSchema, {
	ReadCart_itemsOrders,
} from '../../cart_items-feature/generated-schemas/read-cart-_items-orders.schema';

export class ReadProductsOrders {
	seller_id?: OrderDirectionEnum;
	product_seller?: ReadUsersOrders | OrderDirectionEnum;
	name?: OrderDirectionEnum;
	description?: OrderDirectionEnum;
	price?: OrderDirectionEnum;
	stock?: OrderDirectionEnum;
	product_order_items?: ReadOrder_itemsOrders | OrderDirectionEnum;
	product_reviews?: ReadReviewsOrders | OrderDirectionEnum;
	product_cart_items?: ReadCart_itemsOrders | OrderDirectionEnum;
}

const ReadProductsOrdersSchema: v.GenericSchema<ReadProductsOrders> = v.object({
	seller_id: v.optional(OrderDirectionSchema),
	product_seller: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUsersOrdersSchema)])),
	name: v.optional(OrderDirectionSchema),
	description: v.optional(OrderDirectionSchema),
	price: v.optional(OrderDirectionSchema),
	stock: v.optional(OrderDirectionSchema),
	product_order_items: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrder_itemsOrdersSchema)])),
	product_reviews: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadReviewsOrdersSchema)])),
	product_cart_items: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCart_itemsOrdersSchema)])),
});

export default ReadProductsOrdersSchema;

export type TReadProductsOrdersSchemaOutput = v.InferOutput<typeof ReadProductsOrdersSchema>;
export type TReadProductsOrdersSchemaInput = v.InferInput<typeof ReadProductsOrdersSchema>;
