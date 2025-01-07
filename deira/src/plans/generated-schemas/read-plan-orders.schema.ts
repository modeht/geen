import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import { PlanTypeEnum } from '../entities/plan.entity';
import ReadAdOrdersSchema, { ReadAdOrders } from '../../ads/generated-schemas/read-ad-orders.schema';
import ReadTranslationOrdersSchema, {
	ReadTranslationOrders,
} from '../../translations/generated-schemas/read-translation-orders.schema';
import ReadWalletLogOrdersSchema, {
	ReadWalletLogOrders,
} from '../../wallets/generated-schemas/read-wallet-log-orders.schema';

export class ReadPlanOrders {
	name?: OrderDirectionEnum;
	description?: OrderDirectionEnum;
	price?: OrderDirectionEnum;
	mediaLimit?: OrderDirectionEnum;
	videoLimit?: OrderDirectionEnum;
	durationDays?: OrderDirectionEnum;
	index?: OrderDirectionEnum;
	ads?: ReadAdOrders | OrderDirectionEnum;
	translations?: ReadTranslationOrders | OrderDirectionEnum;
	walletLogs?: ReadWalletLogOrders | OrderDirectionEnum;
	type?: PlanTypeEnum | null;
	isArchived?: OrderDirectionEnum;
}

const ReadPlanOrdersSchema: v.GenericSchema<ReadPlanOrders> = v.object({
	name: v.optional(OrderDirectionSchema),
	description: v.optional(OrderDirectionSchema),
	price: v.optional(OrderDirectionSchema),
	mediaLimit: v.optional(OrderDirectionSchema),
	videoLimit: v.optional(OrderDirectionSchema),
	durationDays: v.optional(OrderDirectionSchema),
	index: v.optional(OrderDirectionSchema),
	ads: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAdOrdersSchema)])),
	translations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTranslationOrdersSchema)])),
	walletLogs: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadWalletLogOrdersSchema)])),
	type: v.nullish(v.enum(PlanTypeEnum)),
	isArchived: v.optional(OrderDirectionSchema),
});

export default ReadPlanOrdersSchema;

export type TReadPlanOrdersSchemaOutput = v.InferOutput<typeof ReadPlanOrdersSchema>;
export type TReadPlanOrdersSchemaInput = v.InferInput<typeof ReadPlanOrdersSchema>;
