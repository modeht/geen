import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadNotificationOrdersSchema, ReadNotificationOrders } from '../../notifications/generated-schemas/read-notification-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import { ReadSeasonalPromotionOrdersSchema, ReadSeasonalPromotionOrders } from './read-seasonal-promotion-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import { ReadOrderItemOrdersSchema, ReadOrderItemOrders } from '../../orders/generated-schemas/read-order-item-orders.schema'


import { PromotionTypeEnum } from '../entities/enums'
import { PromotionTargetEnum } from '../entities/enums'
import { PromotionStatusEnum } from '../entities/enums'
export class ReadPromotionOrders {type?: PromotionTypeEnum | null | undefined;
target?: PromotionTargetEnum | null | undefined;
status?: PromotionStatusEnum | null | undefined;
notifications?: ReadNotificationOrders | OrderDirectionEnum | undefined;
brand?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
seasonalPromotion?: ReadSeasonalPromotionOrders | OrderDirectionEnum | undefined;
products?: ReadProductOrders | OrderDirectionEnum | undefined;
orderItems?: ReadOrderItemOrders | OrderDirectionEnum | undefined}

export const ReadPromotionOrdersSchema: v.GenericSchema<ReadPromotionOrders> = v.object({type: v.nullish(v.enum(PromotionTypeEnum)),
target: v.nullish(v.enum(PromotionTargetEnum)),
status: v.nullish(v.enum(PromotionStatusEnum)),
notifications: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
brand: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
seasonalPromotion: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadSeasonalPromotionOrdersSchema)])),
products: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
orderItems: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)]))})



export type TReadPromotionOrdersSchemaOutput = v.InferOutput<typeof ReadPromotionOrdersSchema>;
export type TReadPromotionOrdersSchemaInput = v.InferInput<typeof ReadPromotionOrdersSchema>;
