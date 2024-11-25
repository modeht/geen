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
totalSalePrice?: OrderDirectionEnum | undefined;
totalPurchasePrice?: OrderDirectionEnum | undefined;
totalShippingFees?: OrderDirectionEnum | undefined;
cart?: ReadCartOrders | OrderDirectionEnum | undefined;
brandOrders?: ReadBrandOrderOrders | OrderDirectionEnum | undefined;
shippingAddress?: ReadShippingAddressOrders | OrderDirectionEnum | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
cartId?: OrderDirectionEnum | undefined;
shippingAddressId?: OrderDirectionEnum | undefined;
shopperId?: OrderDirectionEnum | undefined}

export const ReadOrderOrdersSchema: v.GenericSchema<ReadOrderOrders> = v.object({paymentMethod: v.nullish(v.enum(OrderPaymentMethod)),
paymentStatus: v.nullish(v.enum(OrderPaymentStatusEnum)),
totalSalePrice: v.undefinedable(OrderDirectionSchema),
totalPurchasePrice: v.undefinedable(OrderDirectionSchema),
totalShippingFees: v.undefinedable(OrderDirectionSchema),
cart: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
brandOrders: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandOrderOrdersSchema)])),
shippingAddress: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShippingAddressOrdersSchema)])),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
cartId: v.undefinedable(OrderDirectionSchema),
shippingAddressId: v.undefinedable(OrderDirectionSchema),
shopperId: v.undefinedable(OrderDirectionSchema)})



export type TReadOrderOrdersSchemaOutput = v.InferOutput<typeof ReadOrderOrdersSchema>;
export type TReadOrderOrdersSchemaInput = v.InferInput<typeof ReadOrderOrdersSchema>;
