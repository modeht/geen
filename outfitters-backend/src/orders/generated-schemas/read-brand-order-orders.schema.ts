import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import { ReadOrderItemOrdersSchema, ReadOrderItemOrders } from './read-order-item-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import { ReadOrderOrdersSchema, ReadOrderOrders } from './read-order-orders.schema'



export class ReadBrandOrderOrders {status?: OrderStatusEnum | null | undefined;
totalSalePrice?: OrderDirectionEnum | undefined;
totalPurchasePrice?: OrderDirectionEnum | undefined;
shippingFees?: OrderDirectionEnum | undefined;
rating?: OrderDirectionEnum | undefined;
review?: OrderDirectionEnum | undefined;
expectedDeliveryDate?: OrderDirectionEnum | undefined;
acceptedAt?: OrderDirectionEnum | undefined;
shippedAt?: OrderDirectionEnum | undefined;
deliveredAt?: OrderDirectionEnum | undefined;
cancelledAt?: OrderDirectionEnum | undefined;
items?: ReadOrderItemOrders | OrderDirectionEnum | undefined;
brand?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
order?: ReadOrderOrders | OrderDirectionEnum | undefined;
orderId?: OrderDirectionEnum | undefined;
brandId?: OrderDirectionEnum | undefined}

export const ReadBrandOrderOrdersSchema: v.GenericSchema<ReadBrandOrderOrders> = v.object({status: v.nullish(v.enum(OrderStatusEnum)),
totalSalePrice: v.undefinedable(OrderDirectionSchema),
totalPurchasePrice: v.undefinedable(OrderDirectionSchema),
shippingFees: v.undefinedable(OrderDirectionSchema),
rating: v.undefinedable(OrderDirectionSchema),
review: v.undefinedable(OrderDirectionSchema),
expectedDeliveryDate: v.undefinedable(OrderDirectionSchema),
acceptedAt: v.undefinedable(OrderDirectionSchema),
shippedAt: v.undefinedable(OrderDirectionSchema),
deliveredAt: v.undefinedable(OrderDirectionSchema),
cancelledAt: v.undefinedable(OrderDirectionSchema),
items: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
brand: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
order: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
orderId: v.undefinedable(OrderDirectionSchema),
brandId: v.undefinedable(OrderDirectionSchema)})



export type TReadBrandOrderOrdersSchemaOutput = v.InferOutput<typeof ReadBrandOrderOrdersSchema>;
export type TReadBrandOrderOrdersSchemaInput = v.InferInput<typeof ReadBrandOrderOrdersSchema>;
