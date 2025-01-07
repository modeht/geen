import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadTranslationOrdersSchema, {
	ReadTranslationOrders,
} from '../../translations/generated-schemas/read-translation-orders.schema';
import ReadCountryOrdersSchema, {
	ReadCountryOrders,
} from '../../countries/generated-schemas/read-country-orders.schema';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';
import ReadAdOrdersSchema, { ReadAdOrders } from '../../ads/generated-schemas/read-ad-orders.schema';

export class ReadGovernorateOrders {
	name?: OrderDirectionEnum;
	translations?: ReadTranslationOrders | OrderDirectionEnum;
	country?: ReadCountryOrders | OrderDirectionEnum;
	users?: ReadUserOrders | OrderDirectionEnum;
	ads?: ReadAdOrders | OrderDirectionEnum;
}

const ReadGovernorateOrdersSchema: v.GenericSchema<ReadGovernorateOrders> = v.object({
	name: v.optional(OrderDirectionSchema),
	translations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTranslationOrdersSchema)])),
	country: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCountryOrdersSchema)])),
	users: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	ads: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAdOrdersSchema)])),
});

export default ReadGovernorateOrdersSchema;

export type TReadGovernorateOrdersSchemaOutput = v.InferOutput<typeof ReadGovernorateOrdersSchema>;
export type TReadGovernorateOrdersSchemaInput = v.InferInput<typeof ReadGovernorateOrdersSchema>;
