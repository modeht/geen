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
export class ReadPromotionOrders {title?: OrderDirectionEnum | undefined;
type?: PromotionTypeEnum | null | undefined;
discountPercentage?: OrderDirectionEnum | undefined;
minPurchaseAmount?: OrderDirectionEnum | undefined;
start?: OrderDirectionEnum | undefined;
end?: OrderDirectionEnum | undefined;
target?: PromotionTargetEnum | null | undefined;
status?: PromotionStatusEnum | null | undefined;
notifications?: ReadNotificationOrders | OrderDirectionEnum | undefined;
brand?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
seasonalPromotion?: ReadSeasonalPromotionOrders | OrderDirectionEnum | undefined;
products?: ReadProductOrders | OrderDirectionEnum | undefined;
orderItems?: ReadOrderItemOrders | OrderDirectionEnum | undefined;
isDeleted?: OrderDirectionEnum | undefined;
seasonalPromotionId?: OrderDirectionEnum | undefined;
brandId?: OrderDirectionEnum | undefined}

export const ReadPromotionOrdersSchema: v.GenericSchema<ReadPromotionOrders> = v.object({title: v.undefinedable(OrderDirectionSchema),
type: v.nullish(v.enum(PromotionTypeEnum)),
discountPercentage: v.undefinedable(OrderDirectionSchema),
minPurchaseAmount: v.undefinedable(OrderDirectionSchema),
start: v.undefinedable(OrderDirectionSchema),
end: v.undefinedable(OrderDirectionSchema),
target: v.nullish(v.enum(PromotionTargetEnum)),
status: v.nullish(v.enum(PromotionStatusEnum)),
notifications: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
brand: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
seasonalPromotion: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadSeasonalPromotionOrdersSchema)])),
products: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
orderItems: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
isDeleted: v.undefinedable(OrderDirectionSchema),
seasonalPromotionId: v.undefinedable(OrderDirectionSchema),
brandId: v.undefinedable(OrderDirectionSchema)})



export type TReadPromotionOrdersSchemaOutput = v.InferOutput<typeof ReadPromotionOrdersSchema>;
export type TReadPromotionOrdersSchemaInput = v.InferInput<typeof ReadPromotionOrdersSchema>;
