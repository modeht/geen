import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadProductsOrdersSchema, {
	ReadProductsOrders,
} from '../../products-feature/generated-schemas/read-products-orders.schema';
import ReadOrdersOrdersSchema, {
	ReadOrdersOrders,
} from '../../orders-feature/generated-schemas/read-orders-orders.schema';
import ReadReviewsOrdersSchema, {
	ReadReviewsOrders,
} from '../../reviews-feature/generated-schemas/read-reviews-orders.schema';
import ReadCart_itemsOrdersSchema, {
	ReadCart_itemsOrders,
} from '../../cart_items-feature/generated-schemas/read-cart-_items-orders.schema';

export class ReadUsersOrders {
	username?: OrderDirectionEnum;
	email?: OrderDirectionEnum;
	password?: OrderDirectionEnum;
	role?: OrderDirectionEnum;
	seller_products?: ReadProductsOrders | OrderDirectionEnum;
	user_orders?: ReadOrdersOrders | OrderDirectionEnum;
	user_reviews?: ReadReviewsOrders | OrderDirectionEnum;
	user_cart_items?: ReadCart_itemsOrders | OrderDirectionEnum;
}

const ReadUsersOrdersSchema: v.GenericSchema<ReadUsersOrders> = v.object({
	username: v.optional(OrderDirectionSchema),
	email: v.optional(OrderDirectionSchema),
	password: v.optional(OrderDirectionSchema),
	role: v.optional(OrderDirectionSchema),
	seller_products: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductsOrdersSchema)])),
	user_orders: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrdersOrdersSchema)])),
	user_reviews: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadReviewsOrdersSchema)])),
	user_cart_items: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCart_itemsOrdersSchema)])),
});

export default ReadUsersOrdersSchema;

export type TReadUsersOrdersSchemaOutput = v.InferOutput<typeof ReadUsersOrdersSchema>;
export type TReadUsersOrdersSchemaInput = v.InferInput<typeof ReadUsersOrdersSchema>;
