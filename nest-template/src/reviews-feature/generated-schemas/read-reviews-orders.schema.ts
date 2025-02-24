import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUsersOrdersSchema, { ReadUsersOrders } from '../../users-feature/generated-schemas/read-users-orders.schema';
import ReadProductsOrdersSchema, {
	ReadProductsOrders,
} from '../../products-feature/generated-schemas/read-products-orders.schema';

export class ReadReviewsOrders {
	user_id?: ReadUsersOrders | OrderDirectionEnum;
	product_id?: ReadProductsOrders | OrderDirectionEnum;
	rating?: OrderDirectionEnum;
	review_text?: OrderDirectionEnum;
}

const ReadReviewsOrdersSchema: v.GenericSchema<ReadReviewsOrders> = v.object({
	user_id: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUsersOrdersSchema)])),
	product_id: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductsOrdersSchema)])),
	rating: v.optional(OrderDirectionSchema),
	review_text: v.optional(OrderDirectionSchema),
});

export default ReadReviewsOrdersSchema;

export type TReadReviewsOrdersSchemaOutput = v.InferOutput<typeof ReadReviewsOrdersSchema>;
export type TReadReviewsOrdersSchemaInput = v.InferInput<typeof ReadReviewsOrdersSchema>;
