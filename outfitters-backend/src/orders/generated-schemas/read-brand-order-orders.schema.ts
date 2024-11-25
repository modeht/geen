import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import { ReadOrderItemOrdersSchema, ReadOrderItemOrders } from './read-order-item-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import { ReadOrderOrdersSchema, ReadOrderOrders } from './read-order-orders.schema'



export class ReadBrandOrderOrders {status?: OrderStatusEnum | null | undefined;
items?: ReadOrderItemOrders | OrderDirectionEnum | undefined;
brand?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
order?: ReadOrderOrders | OrderDirectionEnum | undefined}

export const ReadBrandOrderOrdersSchema: v.GenericSchema<ReadBrandOrderOrders> = v.object({status: v.nullish(v.enum(OrderStatusEnum)),
items: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
brand: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
order: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)]))})



export type TReadBrandOrderOrdersSchemaOutput = v.InferOutput<typeof ReadBrandOrderOrdersSchema>;
export type TReadBrandOrderOrdersSchemaInput = v.InferInput<typeof ReadBrandOrderOrdersSchema>;
