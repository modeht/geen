import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadOrderOrdersSchema, ReadOrderOrders } from '../../orders/generated-schemas/read-order-orders.schema'
import { ReadShopperProfileOrdersSchema, ReadShopperProfileOrders } from './read-shopper-profile-orders.schema'



export class ReadShippingAddressOrders {orders?: ReadOrderOrders | OrderDirectionEnum | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined}

export const ReadShippingAddressOrdersSchema: v.GenericSchema<ReadShippingAddressOrders> = v.object({orders: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)]))})



export type TReadShippingAddressOrdersSchemaOutput = v.InferOutput<typeof ReadShippingAddressOrdersSchema>;
export type TReadShippingAddressOrdersSchemaInput = v.InferInput<typeof ReadShippingAddressOrdersSchema>;
