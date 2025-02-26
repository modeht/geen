import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadProductsOrdersSchema, {
	ReadProductsOrders,
} from '../../products-feature/generated-schemas/read-products-orders.schema';
import ReadUsersOrdersSchema, { ReadUsersOrders } from '../../users-feature/generated-schemas/read-users-orders.schema';

export class ReadReviewsOrders {
	product_id?: OrderDirectionEnum;
	review_product?: ReadProductsOrders | OrderDirectionEnum;
	user_id?: OrderDirectionEnum;
	review_user?: ReadUsersOrders | OrderDirectionEnum;
	rating?: OrderDirectionEnum;
	comment?: OrderDirectionEnum;
}

const ReadReviewsOrdersSchema: v.GenericSchema<ReadReviewsOrders> = v.object({
	product_id: v.optional(OrderDirectionSchema),
	review_product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductsOrdersSchema)])),
	user_id: v.optional(OrderDirectionSchema),
	review_user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUsersOrdersSchema)])),
	rating: v.optional(OrderDirectionSchema),
	comment: v.optional(OrderDirectionSchema),
});

export default ReadReviewsOrdersSchema;

export type TReadReviewsOrdersSchemaOutput = v.InferOutput<typeof ReadReviewsOrdersSchema>;
export type TReadReviewsOrdersSchemaInput = v.InferInput<typeof ReadReviewsOrdersSchema>;
