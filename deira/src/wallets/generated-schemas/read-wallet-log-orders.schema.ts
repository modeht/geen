import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';
import ReadWalletOrdersSchema, { ReadWalletOrders } from './read-wallet-orders.schema';
import ReadTranslationOrdersSchema, {
	ReadTranslationOrders,
} from '../../translations/generated-schemas/read-translation-orders.schema';
import ReadPlanOrdersSchema, { ReadPlanOrders } from '../../plans/generated-schemas/read-plan-orders.schema';

export class ReadWalletLogOrders {
	user?: ReadUserOrders | OrderDirectionEnum;
	wallet?: ReadWalletOrders | OrderDirectionEnum;
	translations?: ReadTranslationOrders | OrderDirectionEnum;
	description?: OrderDirectionEnum;
	plan?: ReadPlanOrders | OrderDirectionEnum;
	amount?: OrderDirectionEnum;
}

const ReadWalletLogOrdersSchema: v.GenericSchema<ReadWalletLogOrders> = v.object({
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	wallet: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadWalletOrdersSchema)])),
	translations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTranslationOrdersSchema)])),
	description: v.optional(OrderDirectionSchema),
	plan: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPlanOrdersSchema)])),
	amount: v.optional(OrderDirectionSchema),
});

export default ReadWalletLogOrdersSchema;

export type TReadWalletLogOrdersSchemaOutput = v.InferOutput<typeof ReadWalletLogOrdersSchema>;
export type TReadWalletLogOrdersSchemaInput = v.InferInput<typeof ReadWalletLogOrdersSchema>;
