import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadOrderItemOrdersSchema, {
	ReadOrderItemOrders,
} from '../../orders/generated-schemas/read-order-item-orders.schema';
import ReadCartItemsOrdersSchema, {
	ReadCartItemsOrders,
} from '../../carts/generated-schemas/read-cart-items-orders.schema';
import ReadProductOrdersSchema, { ReadProductOrders } from './read-product-orders.schema';
import ReadProductOptionValueOrdersSchema, {
	ReadProductOptionValueOrders,
} from './read-product-option-value-orders.schema';

export class ReadProductVariantOrders {
	isArchived?: OrderDirectionEnum;
	stock?: OrderDirectionEnum;
	price?: OrderDirectionEnum;
	lastStockUpdate?: OrderDirectionEnum;
	sku?: OrderDirectionEnum;
	media?: ReadMediaOrders | OrderDirectionEnum;
	orderItems?: ReadOrderItemOrders | OrderDirectionEnum;
	carts?: ReadCartItemsOrders | OrderDirectionEnum;
	mainProduct?: ReadProductOrders | OrderDirectionEnum;
	optionValues?: ReadProductOptionValueOrders | OrderDirectionEnum;
	mainProductId?: OrderDirectionEnum;
}

const ReadProductVariantOrdersSchema: v.GenericSchema<ReadProductVariantOrders> = v.object({
	isArchived: v.optional(OrderDirectionSchema),
	stock: v.optional(OrderDirectionSchema),
	price: v.optional(OrderDirectionSchema),
	lastStockUpdate: v.optional(OrderDirectionSchema),
	sku: v.optional(OrderDirectionSchema),
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	orderItems: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
	carts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCartItemsOrdersSchema)])),
	mainProduct: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
	optionValues: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOptionValueOrdersSchema)])),
	mainProductId: v.optional(OrderDirectionSchema),
});

export default ReadProductVariantOrdersSchema;

export type TReadProductVariantOrdersSchemaOutput = v.InferOutput<typeof ReadProductVariantOrdersSchema>;
export type TReadProductVariantOrdersSchemaInput = v.InferInput<typeof ReadProductVariantOrdersSchema>;
