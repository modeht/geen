import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadBrandProfileOrdersSchema, {
	ReadBrandProfileOrders,
} from '../../users/generated-schemas/read-brand-profile-orders.schema';

export class ReadCountryOrders {
	name?: OrderDirectionEnum;
	code?: OrderDirectionEnum;
	dialCode?: OrderDirectionEnum;
	isSupported?: OrderDirectionEnum;
	icon?: ReadMediaOrders | OrderDirectionEnum;
	brands?: ReadBrandProfileOrders | OrderDirectionEnum;
	iconId?: OrderDirectionEnum;
}

const ReadCountryOrdersSchema: v.GenericSchema<ReadCountryOrders> = v.object({
	name: v.optional(OrderDirectionSchema),
	code: v.optional(OrderDirectionSchema),
	dialCode: v.optional(OrderDirectionSchema),
	isSupported: v.optional(OrderDirectionSchema),
	icon: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	brands: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
	iconId: v.optional(OrderDirectionSchema),
});

export default ReadCountryOrdersSchema;

export type TReadCountryOrdersSchemaOutput = v.InferOutput<typeof ReadCountryOrdersSchema>;
export type TReadCountryOrdersSchemaInput = v.InferInput<typeof ReadCountryOrdersSchema>;
