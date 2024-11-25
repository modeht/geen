import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { OrderPaymentMethod } from '../entities/order.entity';
import { OrderPaymentStatusEnum } from '../entities/order.entity';
import { ReadCartOrdersSchema, ReadCartOrders } from '../../carts/generated-schemas/read-cart-orders.schema'
import { ReadBrandOrderOrdersSchema, ReadBrandOrderOrders } from './read-brand-order-orders.schema'
import { ReadShippingAddressOrdersSchema, ReadShippingAddressOrders } from '../../users/generated-schemas/read-shipping-address-orders.schema'
import { ReadShopperProfileOrdersSchema, ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'



export class ReadOrderOrders {paymentMethod?: OrderPaymentMethod | null | undefined;
paymentStatus?: OrderPaymentStatusEnum | null | undefined;
cart?: ReadCartOrders | OrderDirectionEnum | undefined;
brandOrders?: ReadBrandOrderOrders | OrderDirectionEnum | undefined;
shippingAddress?: ReadShippingAddressOrders | OrderDirectionEnum | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined}

export const ReadOrderOrdersSchema: v.GenericSchema<ReadOrderOrders> = v.object({paymentMethod: v.nullish(v.enum(OrderPaymentMethod)),
paymentStatus: v.nullish(v.enum(OrderPaymentStatusEnum)),
cart: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
brandOrders: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandOrderOrdersSchema)])),
shippingAddress: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShippingAddressOrdersSchema)])),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)]))})



export type TReadOrderOrdersSchemaOutput = v.InferOutput<typeof ReadOrderOrdersSchema>;
export type TReadOrderOrdersSchemaInput = v.InferInput<typeof ReadOrderOrdersSchema>;
