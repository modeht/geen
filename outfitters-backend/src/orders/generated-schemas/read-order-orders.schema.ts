import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { OrderPaymentMethod } from '../entities/order.entity';
import { OrderPaymentStatusEnum } from '../entities/order.entity';
import ReadCartOrdersSchema, { ReadCartOrders } from '../../carts/generated-schemas/read-cart-orders.schema'
import ReadBrandOrderOrdersSchema, { ReadBrandOrderOrders } from './read-brand-order-orders.schema'
import ReadShippingAddressOrdersSchema, { ReadShippingAddressOrders } from '../../users/generated-schemas/read-shipping-address-orders.schema'
import ReadShopperProfileOrdersSchema, { ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'



export class ReadOrderOrders {paymentMethod?: OrderPaymentMethod | null;
paymentStatus?: OrderPaymentStatusEnum | null;
totalSalePrice?: OrderDirectionEnum;
totalPurchasePrice?: OrderDirectionEnum;
totalShippingFees?: OrderDirectionEnum;
cart?: ReadCartOrders | OrderDirectionEnum;
brandOrders?: ReadBrandOrderOrders | OrderDirectionEnum;
shippingAddress?: ReadShippingAddressOrders | OrderDirectionEnum;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum;
cartId?: OrderDirectionEnum;
shippingAddressId?: OrderDirectionEnum;
shopperId?: OrderDirectionEnum}

const ReadOrderOrdersSchema: v.GenericSchema<ReadOrderOrders> = v.object({paymentMethod: v.nullish(v.enum(OrderPaymentMethod)),
paymentStatus: v.nullish(v.enum(OrderPaymentStatusEnum)),
totalSalePrice: v.optional(OrderDirectionSchema),
totalPurchasePrice: v.optional(OrderDirectionSchema),
totalShippingFees: v.optional(OrderDirectionSchema),
cart: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
brandOrders: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandOrderOrdersSchema)])),
shippingAddress: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShippingAddressOrdersSchema)])),
shopperProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
cartId: v.optional(OrderDirectionSchema),
shippingAddressId: v.optional(OrderDirectionSchema),
shopperId: v.optional(OrderDirectionSchema)});

export default ReadOrderOrdersSchema;




export type TReadOrderOrdersSchemaOutput = v.InferOutput<typeof ReadOrderOrdersSchema>;
export type TReadOrderOrdersSchemaInput = v.InferInput<typeof ReadOrderOrdersSchema>;
