import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadCategoryFilterOrdersSchema, {
	ReadCategoryFilterOrders,
} from '../../category-fitlers/generated-schemas/read-category-filter-orders.schema';
import ReadWalletLogOrdersSchema, {
	ReadWalletLogOrders,
} from '../../wallets/generated-schemas/read-wallet-log-orders.schema';
import ReadCategoryOrdersSchema, {
	ReadCategoryOrders,
} from '../../categories/generated-schemas/read-category-orders.schema';
import ReadPlanOrdersSchema, { ReadPlanOrders } from '../../plans/generated-schemas/read-plan-orders.schema';
import ReadCountryOrdersSchema, {
	ReadCountryOrders,
} from '../../countries/generated-schemas/read-country-orders.schema';
import ReadGovernorateOrdersSchema, {
	ReadGovernorateOrders,
} from '../../governorate/generated-schemas/read-governorate-orders.schema';

import { LanguageEnum } from '../../../lib/enums';
export class ReadTranslationOrders {
	categoryFilter?: ReadCategoryFilterOrders | OrderDirectionEnum;
	log?: ReadWalletLogOrders | OrderDirectionEnum;
	category?: ReadCategoryOrders | OrderDirectionEnum;
	plan?: ReadPlanOrders | OrderDirectionEnum;
	country?: ReadCountryOrders | OrderDirectionEnum;
	governorate?: ReadGovernorateOrders | OrderDirectionEnum;
	language?: LanguageEnum | null;
}

const ReadTranslationOrdersSchema: v.GenericSchema<ReadTranslationOrders> = v.object({
	categoryFilter: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryFilterOrdersSchema)])),
	log: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadWalletLogOrdersSchema)])),
	category: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	plan: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPlanOrdersSchema)])),
	country: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCountryOrdersSchema)])),
	governorate: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadGovernorateOrdersSchema)])),
	language: v.nullish(v.enum(LanguageEnum)),
});

export default ReadTranslationOrdersSchema;

export type TReadTranslationOrdersSchemaOutput = v.InferOutput<typeof ReadTranslationOrdersSchema>;
export type TReadTranslationOrdersSchemaInput = v.InferInput<typeof ReadTranslationOrdersSchema>;
