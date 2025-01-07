import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';

export class ReadRedeemOrders {
	referrer?: ReadUserOrders | OrderDirectionEnum;
	redeemer?: ReadUserOrders | OrderDirectionEnum;
	amount?: OrderDirectionEnum;
}

const ReadRedeemOrdersSchema: v.GenericSchema<ReadRedeemOrders> = v.object({
	referrer: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	redeemer: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	amount: v.optional(OrderDirectionSchema),
});

export default ReadRedeemOrdersSchema;

export type TReadRedeemOrdersSchemaOutput = v.InferOutput<typeof ReadRedeemOrdersSchema>;
export type TReadRedeemOrdersSchemaInput = v.InferInput<typeof ReadRedeemOrdersSchema>;
