import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadCartOrdersSchema, ReadCartOrders } from '../../carts/generated-schemas/read-cart-orders.schema'
import { ReadOrderItemOrdersSchema, ReadOrderItemOrders } from '../../orders/generated-schemas/read-order-item-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import { ReadShopperProfileOrdersSchema, ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'


import { PromotionTypeEnum } from '../entities/enums'
import { PromotionStatusEnum } from '../entities/enums'
export class ReadPromoCodeOrders {type?: PromotionTypeEnum | null | undefined;
status?: PromotionStatusEnum | null | undefined;
carts?: ReadCartOrders | OrderDirectionEnum | undefined;
orderItems?: ReadOrderItemOrders | OrderDirectionEnum | undefined;
brand?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
products?: ReadProductOrders | OrderDirectionEnum | undefined}

export const ReadPromoCodeOrdersSchema: v.GenericSchema<ReadPromoCodeOrders> = v.object({type: v.nullish(v.enum(PromotionTypeEnum)),
status: v.nullish(v.enum(PromotionStatusEnum)),
carts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
orderItems: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
brand: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
products: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)]))})



export type TReadPromoCodeOrdersSchemaOutput = v.InferOutput<typeof ReadPromoCodeOrdersSchema>;
export type TReadPromoCodeOrdersSchemaInput = v.InferInput<typeof ReadPromoCodeOrdersSchema>;
