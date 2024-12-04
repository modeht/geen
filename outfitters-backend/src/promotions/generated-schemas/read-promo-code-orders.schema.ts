import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadCartOrdersSchema, { ReadCartOrders } from '../../carts/generated-schemas/read-cart-orders.schema'
import ReadOrderItemOrdersSchema, { ReadOrderItemOrders } from '../../orders/generated-schemas/read-order-item-orders.schema'
import ReadBrandProfileOrdersSchema, { ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import ReadShopperProfileOrdersSchema, { ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import ReadProductOrdersSchema, { ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'


import { PromotionTypeEnum } from '../entities/enums'
import { PromotionStatusEnum } from '../entities/enums'
export class ReadPromoCodeOrders {deletedAt?: OrderDirectionEnum;
code?: OrderDirectionEnum;
title?: OrderDirectionEnum;
minPurchaseAmount?: OrderDirectionEnum;
perUserLimit?: OrderDirectionEnum;
totalLimit?: OrderDirectionEnum;
start?: OrderDirectionEnum;
end?: OrderDirectionEnum;
discountPercentage?: OrderDirectionEnum;
type?: PromotionTypeEnum | null;
status?: PromotionStatusEnum | null;
carts?: ReadCartOrders | OrderDirectionEnum;
orderItems?: ReadOrderItemOrders | OrderDirectionEnum;
brand?: ReadBrandProfileOrders | OrderDirectionEnum;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum;
products?: ReadProductOrders | OrderDirectionEnum;
brandId?: OrderDirectionEnum;
shopperId?: OrderDirectionEnum;
ussageCount?: OrderDirectionEnum;
totalMoneyDeducted?: OrderDirectionEnum}

const ReadPromoCodeOrdersSchema: v.GenericSchema<ReadPromoCodeOrders> = v.object({deletedAt: v.optional(OrderDirectionSchema),
code: v.optional(OrderDirectionSchema),
title: v.optional(OrderDirectionSchema),
minPurchaseAmount: v.optional(OrderDirectionSchema),
perUserLimit: v.optional(OrderDirectionSchema),
totalLimit: v.optional(OrderDirectionSchema),
start: v.optional(OrderDirectionSchema),
end: v.optional(OrderDirectionSchema),
discountPercentage: v.optional(OrderDirectionSchema),
type: v.nullish(v.enum(PromotionTypeEnum)),
status: v.nullish(v.enum(PromotionStatusEnum)),
carts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
orderItems: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
brand: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
shopperProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
products: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
brandId: v.optional(OrderDirectionSchema),
shopperId: v.optional(OrderDirectionSchema),
ussageCount: v.optional(OrderDirectionSchema),
totalMoneyDeducted: v.optional(OrderDirectionSchema)});

export default ReadPromoCodeOrdersSchema;




export type TReadPromoCodeOrdersSchemaOutput = v.InferOutput<typeof ReadPromoCodeOrdersSchema>;
export type TReadPromoCodeOrdersSchemaInput = v.InferInput<typeof ReadPromoCodeOrdersSchema>;
