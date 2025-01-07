import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadTranslationOrdersSchema, {
	ReadTranslationOrders,
} from '../../translations/generated-schemas/read-translation-orders.schema';
import ReadGovernorateOrdersSchema, {
	ReadGovernorateOrders,
} from '../../governorate/generated-schemas/read-governorate-orders.schema';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';

export class ReadCountryOrders {
	name?: OrderDirectionEnum;
	translations?: ReadTranslationOrders | OrderDirectionEnum;
	governorates?: ReadGovernorateOrders | OrderDirectionEnum;
	users?: ReadUserOrders | OrderDirectionEnum;
}

const ReadCountryOrdersSchema: v.GenericSchema<ReadCountryOrders> = v.object({
	name: v.optional(OrderDirectionSchema),
	translations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTranslationOrdersSchema)])),
	governorates: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadGovernorateOrdersSchema)])),
	users: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
});

export default ReadCountryOrdersSchema;

export type TReadCountryOrdersSchemaOutput = v.InferOutput<typeof ReadCountryOrdersSchema>;
export type TReadCountryOrdersSchemaInput = v.InferInput<typeof ReadCountryOrdersSchema>;
