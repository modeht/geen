import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadCartSchema, ReadCartSchemaFilters } from '../../carts/generated-schemas/read-cart.schema'
import { ReadOrderItemSchema, ReadOrderItemSchemaFilters } from '../../orders/generated-schemas/read-order-item.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from '../../users/generated-schemas/read-brand-profile.schema'
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from '../../users/generated-schemas/read-shopper-profile.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'

export class ReadPromoCodeSchemaFilters {deletedAt?: GenericComparable<"date"> | null | undefined;
code?: GenericComparable<"string"> | null | undefined;
title?: GenericComparable<"string"> | null | undefined;
minPurchaseAmount?: GenericComparable<"number"> | null | undefined;
perUserLimit?: GenericComparable<"number"> | null | undefined;
totalLimit?: GenericComparable<"number"> | null | undefined;
start?: GenericComparable<"date"> | null | undefined;
end?: GenericComparable<"date"> | null | undefined;
discountPercentage?: GenericComparable<"number"> | null | undefined;
carts?: ReadCartSchemaFilters | null | undefined;
orderItems?: ReadOrderItemSchemaFilters | null | undefined;
brand?: ReadBrandProfileSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileSchemaFilters | null | undefined;
products?: ReadProductSchemaFilters | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined;
ussageCount?: GenericComparable<"number"> | null | undefined;
totalMoneyDeducted?: GenericComparable<"number"> | null | undefined}

export const ReadPromoCodeSchema: v.GenericSchema<ReadPromoCodeSchemaFilters> = v.object({deletedAt: v.nullish(comparable("date")),
code: v.nullish(comparable("string")),
title: v.nullish(comparable("string")),
minPurchaseAmount: v.nullish(comparable("number")),
perUserLimit: v.nullish(comparable("number")),
totalLimit: v.nullish(comparable("number")),
start: v.nullish(comparable("date")),
end: v.nullish(comparable("date")),
discountPercentage: v.nullish(comparable("number")),
carts: v.nullish(v.lazy(() => ReadCartSchema)),
orderItems: v.nullish(v.lazy(() => ReadOrderItemSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
products: v.nullish(v.lazy(() => ReadProductSchema)),
brandId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number")),
ussageCount: v.nullish(comparable("number")),
totalMoneyDeducted: v.nullish(comparable("number"))})



export type TReadPromoCodeSchema = v.InferOutput<typeof ReadPromoCodeSchema>
export type TReadPromoCodeSchemaInput = v.InferInput<typeof ReadPromoCodeSchema>
