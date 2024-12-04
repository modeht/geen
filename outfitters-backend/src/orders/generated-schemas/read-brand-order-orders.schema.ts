import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import ReadOrderItemOrdersSchema, { ReadOrderItemOrders } from './read-order-item-orders.schema'
import ReadBrandProfileOrdersSchema, { ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import ReadOrderOrdersSchema, { ReadOrderOrders } from './read-order-orders.schema'



export class ReadBrandOrderOrders {status?: OrderStatusEnum | null;
totalSalePrice?: OrderDirectionEnum;
totalPurchasePrice?: OrderDirectionEnum;
shippingFees?: OrderDirectionEnum;
rating?: OrderDirectionEnum;
review?: OrderDirectionEnum;
expectedDeliveryDate?: OrderDirectionEnum;
acceptedAt?: OrderDirectionEnum;
shippedAt?: OrderDirectionEnum;
deliveredAt?: OrderDirectionEnum;
cancelledAt?: OrderDirectionEnum;
items?: ReadOrderItemOrders | OrderDirectionEnum;
brand?: ReadBrandProfileOrders | OrderDirectionEnum;
order?: ReadOrderOrders | OrderDirectionEnum;
orderId?: OrderDirectionEnum;
brandId?: OrderDirectionEnum}

const ReadBrandOrderOrdersSchema: v.GenericSchema<ReadBrandOrderOrders> = v.object({status: v.nullish(v.enum(OrderStatusEnum)),
totalSalePrice: v.optional(OrderDirectionSchema),
totalPurchasePrice: v.optional(OrderDirectionSchema),
shippingFees: v.optional(OrderDirectionSchema),
rating: v.optional(OrderDirectionSchema),
review: v.optional(OrderDirectionSchema),
expectedDeliveryDate: v.optional(OrderDirectionSchema),
acceptedAt: v.optional(OrderDirectionSchema),
shippedAt: v.optional(OrderDirectionSchema),
deliveredAt: v.optional(OrderDirectionSchema),
cancelledAt: v.optional(OrderDirectionSchema),
items: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
brand: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
order: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
orderId: v.optional(OrderDirectionSchema),
brandId: v.optional(OrderDirectionSchema)});

export default ReadBrandOrderOrdersSchema;




export type TReadBrandOrderOrdersSchemaOutput = v.InferOutput<typeof ReadBrandOrderOrdersSchema>;
export type TReadBrandOrderOrdersSchemaInput = v.InferInput<typeof ReadBrandOrderOrdersSchema>;
