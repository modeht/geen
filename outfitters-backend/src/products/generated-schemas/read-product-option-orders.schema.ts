import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadProductOrdersSchema, { ReadProductOrders } from './read-product-orders.schema';
import ReadProductOptionValueOrdersSchema, {
	ReadProductOptionValueOrders,
} from './read-product-option-value-orders.schema';

export class ReadProductOptionOrders {
	name?: OrderDirectionEnum;
	productId?: OrderDirectionEnum;
	product?: ReadProductOrders | OrderDirectionEnum;
	values?: ReadProductOptionValueOrders | OrderDirectionEnum;
}

const ReadProductOptionOrdersSchema: v.GenericSchema<ReadProductOptionOrders> = v.object({
	name: v.optional(OrderDirectionSchema),
	productId: v.optional(OrderDirectionSchema),
	product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
	values: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOptionValueOrdersSchema)])),
});

export default ReadProductOptionOrdersSchema;

export type TReadProductOptionOrdersSchemaOutput = v.InferOutput<typeof ReadProductOptionOrdersSchema>;
export type TReadProductOptionOrdersSchemaInput = v.InferInput<typeof ReadProductOptionOrdersSchema>;
