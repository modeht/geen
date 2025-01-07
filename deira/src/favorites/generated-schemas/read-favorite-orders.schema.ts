import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadAdOrdersSchema, { ReadAdOrders } from '../../ads/generated-schemas/read-ad-orders.schema';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';

export class ReadFavoriteOrders {
	ad?: ReadAdOrders | OrderDirectionEnum;
	user?: ReadUserOrders | OrderDirectionEnum;
}

const ReadFavoriteOrdersSchema: v.GenericSchema<ReadFavoriteOrders> = v.object({
	ad: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAdOrdersSchema)])),
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
});

export default ReadFavoriteOrdersSchema;

export type TReadFavoriteOrdersSchemaOutput = v.InferOutput<typeof ReadFavoriteOrdersSchema>;
export type TReadFavoriteOrdersSchemaInput = v.InferInput<typeof ReadFavoriteOrdersSchema>;
