import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadOrderOrdersSchema, { ReadOrderOrders } from '../../orders/generated-schemas/read-order-orders.schema';
import ReadShopperProfileOrdersSchema, { ReadShopperProfileOrders } from './read-shopper-profile-orders.schema';

export class ReadShippingAddressOrders {
	deletedAt?: OrderDirectionEnum;
	isDefault?: OrderDirectionEnum;
	name?: OrderDirectionEnum;
	country?: OrderDirectionEnum;
	city?: OrderDirectionEnum;
	street?: OrderDirectionEnum;
	apartment?: OrderDirectionEnum;
	address?: OrderDirectionEnum;
	floor?: OrderDirectionEnum;
	building?: OrderDirectionEnum;
	latitude?: OrderDirectionEnum;
	longitude?: OrderDirectionEnum;
	orders?: ReadOrderOrders | OrderDirectionEnum;
	shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum;
	shopperId?: OrderDirectionEnum;
}

const ReadShippingAddressOrdersSchema: v.GenericSchema<ReadShippingAddressOrders> = v.object({
	deletedAt: v.optional(OrderDirectionSchema),
	isDefault: v.optional(OrderDirectionSchema),
	name: v.optional(OrderDirectionSchema),
	country: v.optional(OrderDirectionSchema),
	city: v.optional(OrderDirectionSchema),
	street: v.optional(OrderDirectionSchema),
	apartment: v.optional(OrderDirectionSchema),
	address: v.optional(OrderDirectionSchema),
	floor: v.optional(OrderDirectionSchema),
	building: v.optional(OrderDirectionSchema),
	latitude: v.optional(OrderDirectionSchema),
	longitude: v.optional(OrderDirectionSchema),
	orders: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
	shopperProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
	shopperId: v.optional(OrderDirectionSchema),
});

export default ReadShippingAddressOrdersSchema;

export type TReadShippingAddressOrdersSchemaOutput = v.InferOutput<typeof ReadShippingAddressOrdersSchema>;
export type TReadShippingAddressOrdersSchemaInput = v.InferInput<typeof ReadShippingAddressOrdersSchema>;
