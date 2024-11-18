import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadCartFiltersSchema, ReadCartFiltersSchemaFilters } from '../../carts/generated-schemas/read-cart-filters.schema'
import { ReadOrderItemFiltersSchema, ReadOrderItemFiltersSchemaFilters } from '../../orders/generated-schemas/read-order-item-filters.schema'
import { ReadBrandProfileFiltersSchema, ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'
import { ReadShopperProfileFiltersSchema, ReadShopperProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-shopper-profile-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'

export class ReadPromoCodeFiltersSchemaFilters {deletedAt?: GenericComparable<"date"> | null | undefined;
code?: GenericComparable<"string"> | null | undefined;
title?: GenericComparable<"string"> | null | undefined;
minPurchaseAmount?: GenericComparable<"number"> | null | undefined;
perUserLimit?: GenericComparable<"number"> | null | undefined;
totalLimit?: GenericComparable<"number"> | null | undefined;
start?: GenericComparable<"date"> | null | undefined;
end?: GenericComparable<"date"> | null | undefined;
discountPercentage?: GenericComparable<"number"> | null | undefined;
carts?: ReadCartFiltersSchemaFilters | null | undefined;
orderItems?: ReadOrderItemFiltersSchemaFilters | null | undefined;
brand?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null | undefined;
products?: ReadProductFiltersSchemaFilters | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined;
ussageCount?: GenericComparable<"number"> | null | undefined;
totalMoneyDeducted?: GenericComparable<"number"> | null | undefined}

export const ReadPromoCodeFiltersSchema: v.GenericSchema<ReadPromoCodeFiltersSchemaFilters> = v.object({deletedAt: v.nullish(comparable("date")),
code: v.nullish(comparable("string")),
title: v.nullish(comparable("string")),
minPurchaseAmount: v.nullish(comparable("number")),
perUserLimit: v.nullish(comparable("number")),
totalLimit: v.nullish(comparable("number")),
start: v.nullish(comparable("date")),
end: v.nullish(comparable("date")),
discountPercentage: v.nullish(comparable("number")),
carts: v.nullish(v.lazy(() => ReadCartFiltersSchema)),
orderItems: v.nullish(v.lazy(() => ReadOrderItemFiltersSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
products: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
brandId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number")),
ussageCount: v.nullish(comparable("number")),
totalMoneyDeducted: v.nullish(comparable("number"))})



export type TReadPromoCodeFiltersSchemaOutput = v.InferOutput<typeof ReadPromoCodeFiltersSchema>;
export type TReadPromoCodeFiltersSchemaInput = v.InferInput<typeof ReadPromoCodeFiltersSchema>;
