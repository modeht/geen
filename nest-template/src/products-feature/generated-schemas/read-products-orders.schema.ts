import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadSellersOrdersSchema, {
	ReadSellersOrders,
} from '../../sellers-feature/generated-schemas/read-sellers-orders.schema';

export class ReadProductsOrders {
	seller_id?: ReadSellersOrders | OrderDirectionEnum;
	name?: OrderDirectionEnum;
	description?: OrderDirectionEnum;
	price?: OrderDirectionEnum;
	inventory_count?: OrderDirectionEnum;
}

const ReadProductsOrdersSchema: v.GenericSchema<ReadProductsOrders> = v.object({
	seller_id: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadSellersOrdersSchema)])),
	name: v.optional(OrderDirectionSchema),
	description: v.optional(OrderDirectionSchema),
	price: v.optional(OrderDirectionSchema),
	inventory_count: v.optional(OrderDirectionSchema),
});

export default ReadProductsOrdersSchema;

export type TReadProductsOrdersSchemaOutput = v.InferOutput<typeof ReadProductsOrdersSchema>;
export type TReadProductsOrdersSchemaInput = v.InferInput<typeof ReadProductsOrdersSchema>;
