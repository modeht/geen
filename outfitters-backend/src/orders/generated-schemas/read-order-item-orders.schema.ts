import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadBrandOrderOrdersSchema, { ReadBrandOrderOrders } from './read-brand-order-orders.schema'
import ReadProductVariantOrdersSchema, { ReadProductVariantOrders } from '../../products/generated-schemas/read-product-variant-orders.schema'
import ReadProductOrdersSchema, { ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import ReadPromoCodeOrdersSchema, { ReadPromoCodeOrders } from '../../promotions/generated-schemas/read-promo-code-orders.schema'
import ReadPromotionOrdersSchema, { ReadPromotionOrders } from '../../promotions/generated-schemas/read-promotion-orders.schema'



export class ReadOrderItemOrders {quantity?: OrderDirectionEnum;
unitSalePrice?: OrderDirectionEnum;
unitPurchasePrice?: OrderDirectionEnum;
totalSalePrice?: OrderDirectionEnum;
totalPurchasePrice?: OrderDirectionEnum;
brandOrder?: ReadBrandOrderOrders | OrderDirectionEnum;
variant?: ReadProductVariantOrders | OrderDirectionEnum;
product?: ReadProductOrders | OrderDirectionEnum;
appliedPromoCode?: ReadPromoCodeOrders | OrderDirectionEnum;
appliedPromotions?: ReadPromotionOrders | OrderDirectionEnum;
brandOrderId?: OrderDirectionEnum;
productId?: OrderDirectionEnum;
variantId?: OrderDirectionEnum;
promoCodeId?: OrderDirectionEnum}

const ReadOrderItemOrdersSchema: v.GenericSchema<ReadOrderItemOrders> = v.object({quantity: v.optional(OrderDirectionSchema),
unitSalePrice: v.optional(OrderDirectionSchema),
unitPurchasePrice: v.optional(OrderDirectionSchema),
totalSalePrice: v.optional(OrderDirectionSchema),
totalPurchasePrice: v.optional(OrderDirectionSchema),
brandOrder: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandOrderOrdersSchema)])),
variant: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)])),
product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
appliedPromoCode: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
appliedPromotions: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)])),
brandOrderId: v.optional(OrderDirectionSchema),
productId: v.optional(OrderDirectionSchema),
variantId: v.optional(OrderDirectionSchema),
promoCodeId: v.optional(OrderDirectionSchema)});

export default ReadOrderItemOrdersSchema;




export type TReadOrderItemOrdersSchemaOutput = v.InferOutput<typeof ReadOrderItemOrdersSchema>;
export type TReadOrderItemOrdersSchemaInput = v.InferInput<typeof ReadOrderItemOrdersSchema>;
