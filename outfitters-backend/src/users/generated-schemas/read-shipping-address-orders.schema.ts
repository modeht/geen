import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadOrderOrdersSchema, { ReadOrderOrders } from '../../orders/generated-schemas/read-order-orders.schema'
import ReadShopperProfileOrdersSchema, { ReadShopperProfileOrders } from './read-shopper-profile-orders.schema'



export class ReadShippingAddressOrders {deletedAt?: OrderDirectionEnum | undefined;
isDefault?: OrderDirectionEnum | undefined;
name?: OrderDirectionEnum | undefined;
country?: OrderDirectionEnum | undefined;
city?: OrderDirectionEnum | undefined;
street?: OrderDirectionEnum | undefined;
apartment?: OrderDirectionEnum | undefined;
address?: OrderDirectionEnum | undefined;
floor?: OrderDirectionEnum | undefined;
building?: OrderDirectionEnum | undefined;
latitude?: OrderDirectionEnum | undefined;
longitude?: OrderDirectionEnum | undefined;
orders?: ReadOrderOrders | OrderDirectionEnum | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
shopperId?: OrderDirectionEnum | undefined}

const ReadShippingAddressOrdersSchema: v.GenericSchema<ReadShippingAddressOrders> = v.object({deletedAt: v.undefinedable(OrderDirectionSchema),
isDefault: v.undefinedable(OrderDirectionSchema),
name: v.undefinedable(OrderDirectionSchema),
country: v.undefinedable(OrderDirectionSchema),
city: v.undefinedable(OrderDirectionSchema),
street: v.undefinedable(OrderDirectionSchema),
apartment: v.undefinedable(OrderDirectionSchema),
address: v.undefinedable(OrderDirectionSchema),
floor: v.undefinedable(OrderDirectionSchema),
building: v.undefinedable(OrderDirectionSchema),
latitude: v.undefinedable(OrderDirectionSchema),
longitude: v.undefinedable(OrderDirectionSchema),
orders: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
shopperId: v.undefinedable(OrderDirectionSchema)});

export default ReadShippingAddressOrdersSchema;




export type TReadShippingAddressOrdersSchemaOutput = v.InferOutput<typeof ReadShippingAddressOrdersSchema>;
export type TReadShippingAddressOrdersSchemaInput = v.InferInput<typeof ReadShippingAddressOrdersSchema>;
