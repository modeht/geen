import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadBrandOrderSchema, ReadBrandOrderSchemaFilters } from './read-brand-order.schema'
import { ReadProductVariantSchema, ReadProductVariantSchemaFilters } from '../../products/generated-schemas/read-product-variant.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'
import { ReadPromoCodeSchema, ReadPromoCodeSchemaFilters } from '../../promotions/generated-schemas/read-promo-code.schema'
import { ReadPromotionSchema, ReadPromotionSchemaFilters } from '../../promotions/generated-schemas/read-promotion.schema'

export class ReadOrderItemSchemaFilters {quantity?: GenericComparable<"number"> | null | undefined;
unitSalePrice?: GenericComparable<"number"> | null | undefined;
unitPurchasePrice?: GenericComparable<"number"> | null | undefined;
totalSalePrice?: GenericComparable<"number"> | null | undefined;
totalPurchasePrice?: GenericComparable<"number"> | null | undefined;
brandOrder?: ReadBrandOrderSchemaFilters | null | undefined;
variant?: ReadProductVariantSchemaFilters | null | undefined;
product?: ReadProductSchemaFilters | null | undefined;
appliedPromoCode?: ReadPromoCodeSchemaFilters | null | undefined;
appliedPromotions?: ReadPromotionSchemaFilters | null | undefined;
brandOrderId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
variantId?: GenericComparable<"number"> | null | undefined;
promoCodeId?: GenericComparable<"number"> | null | undefined}

export const ReadOrderItemSchema: v.GenericSchema<ReadOrderItemSchemaFilters> = v.object({quantity: v.nullish(comparable("number")),
unitSalePrice: v.nullish(comparable("number")),
unitPurchasePrice: v.nullish(comparable("number")),
totalSalePrice: v.nullish(comparable("number")),
totalPurchasePrice: v.nullish(comparable("number")),
brandOrder: v.nullish(v.lazy(() => ReadBrandOrderSchema)),
variant: v.nullish(v.lazy(() => ReadProductVariantSchema)),
product: v.nullish(v.lazy(() => ReadProductSchema)),
appliedPromoCode: v.nullish(v.lazy(() => ReadPromoCodeSchema)),
appliedPromotions: v.nullish(v.lazy(() => ReadPromotionSchema)),
brandOrderId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number")),
variantId: v.nullish(comparable("number")),
promoCodeId: v.nullish(comparable("number"))})



export type TReadOrderItemSchema = v.InferOutput<typeof ReadOrderItemSchema>
export type TReadOrderItemSchemaInput = v.InferInput<typeof ReadOrderItemSchema>
