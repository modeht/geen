import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadNotificationOrdersSchema, { ReadNotificationOrders } from '../../notifications/generated-schemas/read-notification-orders.schema'
import ReadBrandProfileOrdersSchema, { ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import ReadSeasonalPromotionOrdersSchema, { ReadSeasonalPromotionOrders } from './read-seasonal-promotion-orders.schema'
import ReadProductOrdersSchema, { ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import ReadOrderItemOrdersSchema, { ReadOrderItemOrders } from '../../orders/generated-schemas/read-order-item-orders.schema'


import { PromotionTypeEnum } from '../entities/enums'
import { PromotionTargetEnum } from '../entities/enums'
import { PromotionStatusEnum } from '../entities/enums'
export class ReadPromotionOrders {title?: OrderDirectionEnum;
type?: PromotionTypeEnum | null;
discountPercentage?: OrderDirectionEnum;
minPurchaseAmount?: OrderDirectionEnum;
start?: OrderDirectionEnum;
end?: OrderDirectionEnum;
target?: PromotionTargetEnum | null;
status?: PromotionStatusEnum | null;
notifications?: ReadNotificationOrders | OrderDirectionEnum;
brand?: ReadBrandProfileOrders | OrderDirectionEnum;
seasonalPromotion?: ReadSeasonalPromotionOrders | OrderDirectionEnum;
products?: ReadProductOrders | OrderDirectionEnum;
orderItems?: ReadOrderItemOrders | OrderDirectionEnum;
isDeleted?: OrderDirectionEnum;
seasonalPromotionId?: OrderDirectionEnum;
brandId?: OrderDirectionEnum}

const ReadPromotionOrdersSchema: v.GenericSchema<ReadPromotionOrders> = v.object({title: v.optional(OrderDirectionSchema),
type: v.nullish(v.enum(PromotionTypeEnum)),
discountPercentage: v.optional(OrderDirectionSchema),
minPurchaseAmount: v.optional(OrderDirectionSchema),
start: v.optional(OrderDirectionSchema),
end: v.optional(OrderDirectionSchema),
target: v.nullish(v.enum(PromotionTargetEnum)),
status: v.nullish(v.enum(PromotionStatusEnum)),
notifications: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
brand: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
seasonalPromotion: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadSeasonalPromotionOrdersSchema)])),
products: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
orderItems: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
isDeleted: v.optional(OrderDirectionSchema),
seasonalPromotionId: v.optional(OrderDirectionSchema),
brandId: v.optional(OrderDirectionSchema)});

export default ReadPromotionOrdersSchema;




export type TReadPromotionOrdersSchemaOutput = v.InferOutput<typeof ReadPromotionOrdersSchema>;
export type TReadPromotionOrdersSchemaInput = v.InferInput<typeof ReadPromotionOrdersSchema>;
