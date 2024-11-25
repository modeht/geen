import {
	OrderDirectionSchema,
	OrderDirectionEnum,
} from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import {
	ReadMediaOrdersSchema,
	ReadMediaOrders,
} from '../../media/generated-schemas/read-media-orders.schema';
import {
	ReadBrandProfileOrdersSchema,
	ReadBrandProfileOrders,
} from '../../users/generated-schemas/read-brand-profile-orders.schema';

export class ReadCountryOrders {
	icon?: ReadMediaOrders | OrderDirectionEnum | undefined;
	brands?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
}

export const ReadCountryOrdersSchema: v.GenericSchema<ReadCountryOrders> = v.object({
	icon: v.undefinedable(
		v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)]),
	),
	brands: v.undefinedable(
		v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)]),
	),
});

export type TReadCountryOrdersSchemaOutput = v.InferOutput<
	typeof ReadCountryOrdersSchema
>;
export type TReadCountryOrdersSchemaInput = v.InferInput<typeof ReadCountryOrdersSchema>;
