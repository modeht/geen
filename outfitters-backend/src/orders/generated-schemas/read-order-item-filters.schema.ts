import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadBrandOrderFiltersSchema, ReadBrandOrderFiltersSchemaFilters } from './read-brand-order-filters.schema'
import { ReadProductVariantFiltersSchema, ReadProductVariantFiltersSchemaFilters } from '../../products/generated-schemas/read-product-variant-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'
import { ReadPromoCodeFiltersSchema, ReadPromoCodeFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promo-code-filters.schema'
import { ReadPromotionFiltersSchema, ReadPromotionFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promotion-filters.schema'

export class ReadOrderItemFiltersSchemaFilters {quantity?: GenericComparable<"number"> | null | undefined;
unitSalePrice?: GenericComparable<"number"> | null | undefined;
unitPurchasePrice?: GenericComparable<"number"> | null | undefined;
totalSalePrice?: GenericComparable<"number"> | null | undefined;
totalPurchasePrice?: GenericComparable<"number"> | null | undefined;
brandOrder?: ReadBrandOrderFiltersSchemaFilters | null | undefined;
variant?: ReadProductVariantFiltersSchemaFilters | null | undefined;
product?: ReadProductFiltersSchemaFilters | null | undefined;
appliedPromoCode?: ReadPromoCodeFiltersSchemaFilters | null | undefined;
appliedPromotions?: ReadPromotionFiltersSchemaFilters | null | undefined;
brandOrderId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
variantId?: GenericComparable<"number"> | null | undefined;
promoCodeId?: GenericComparable<"number"> | null | undefined}

export const ReadOrderItemFiltersSchema: v.GenericSchema<ReadOrderItemFiltersSchemaFilters> = v.object({quantity: v.nullish(comparable("number")),
unitSalePrice: v.nullish(comparable("number")),
unitPurchasePrice: v.nullish(comparable("number")),
totalSalePrice: v.nullish(comparable("number")),
totalPurchasePrice: v.nullish(comparable("number")),
brandOrder: v.nullish(v.lazy(() => ReadBrandOrderFiltersSchema)),
variant: v.nullish(v.lazy(() => ReadProductVariantFiltersSchema)),
product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
appliedPromoCode: v.nullish(v.lazy(() => ReadPromoCodeFiltersSchema)),
appliedPromotions: v.nullish(v.lazy(() => ReadPromotionFiltersSchema)),
brandOrderId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number")),
variantId: v.nullish(comparable("number")),
promoCodeId: v.nullish(comparable("number"))})



export type TReadOrderItemSchemaOutput = v.InferOutput<typeof ReadOrderItemFiltersSchema>;
export type TReadOrderItemSchemaInput = v.InferInput<typeof ReadOrderItemFiltersSchema>;
