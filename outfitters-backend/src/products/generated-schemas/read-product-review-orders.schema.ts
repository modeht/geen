import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadShopperProfileOrdersSchema, {
	ReadShopperProfileOrders,
} from '../../users/generated-schemas/read-shopper-profile-orders.schema';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadProductOrdersSchema, { ReadProductOrders } from './read-product-orders.schema';

export class ReadProductReviewOrders {
	shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum;
	stars?: OrderDirectionEnum;
	comment?: OrderDirectionEnum;
	media?: ReadMediaOrders | OrderDirectionEnum;
	product?: ReadProductOrders | OrderDirectionEnum;
	productId?: OrderDirectionEnum;
	shopperId?: OrderDirectionEnum;
}

const ReadProductReviewOrdersSchema: v.GenericSchema<ReadProductReviewOrders> = v.object({
	shopperProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
	stars: v.optional(OrderDirectionSchema),
	comment: v.optional(OrderDirectionSchema),
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
	productId: v.optional(OrderDirectionSchema),
	shopperId: v.optional(OrderDirectionSchema),
});

export default ReadProductReviewOrdersSchema;

export type TReadProductReviewOrdersSchemaOutput = v.InferOutput<typeof ReadProductReviewOrdersSchema>;
export type TReadProductReviewOrdersSchemaInput = v.InferInput<typeof ReadProductReviewOrdersSchema>;
