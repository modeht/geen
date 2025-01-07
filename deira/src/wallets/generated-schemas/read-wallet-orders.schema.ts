import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';
import ReadWalletLogOrdersSchema, { ReadWalletLogOrders } from './read-wallet-log-orders.schema';

export class ReadWalletOrders {
	balance?: OrderDirectionEnum;
	user?: ReadUserOrders | OrderDirectionEnum;
	logs?: ReadWalletLogOrders | OrderDirectionEnum;
}

const ReadWalletOrdersSchema: v.GenericSchema<ReadWalletOrders> = v.object({
	balance: v.optional(OrderDirectionSchema),
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	logs: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadWalletLogOrdersSchema)])),
});

export default ReadWalletOrdersSchema;

export type TReadWalletOrdersSchemaOutput = v.InferOutput<typeof ReadWalletOrdersSchema>;
export type TReadWalletOrdersSchemaInput = v.InferInput<typeof ReadWalletOrdersSchema>;
