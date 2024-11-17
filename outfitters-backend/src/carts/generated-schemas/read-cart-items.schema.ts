import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadCartSchema, ReadCartSchemaFilters } from './read-cart.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'
import { ReadProductVariantSchema, ReadProductVariantSchemaFilters } from '../../products/generated-schemas/read-product-variant.schema'
import { ReadAffiliationLinkSchema, ReadAffiliationLinkSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link.schema'

export class ReadCartItemsSchemaFilters {quantity?: GenericComparable<"number"> | null | undefined;
cart?: ReadCartSchemaFilters | null | undefined;
product?: ReadProductSchemaFilters | null | undefined;
variant?: ReadProductVariantSchemaFilters | null | undefined;
affiliationLink?: ReadAffiliationLinkSchemaFilters | null | undefined;
cartId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
variantId?: GenericComparable<"number"> | null | undefined;
affiliationLinkId?: GenericComparable<"number"> | null | undefined;
totalPrice?: GenericComparable<"number"> | null | undefined;
totalDiscountedPrice?: GenericComparable<"number"> | null | undefined;
promoCodeApplied?: GenericComparable<"bool"> | null | undefined;
appliedpromotionsIds?: GenericComparable<"number">[] | null | undefined}

export const ReadCartItemsSchema: v.GenericSchema<ReadCartItemsSchemaFilters> = v.object({quantity: v.nullish(comparable("number")),
cart: v.nullish(v.lazy(() => ReadCartSchema)),
product: v.nullish(v.lazy(() => ReadProductSchema)),
variant: v.nullish(v.lazy(() => ReadProductVariantSchema)),
affiliationLink: v.nullish(v.lazy(() => ReadAffiliationLinkSchema)),
cartId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number")),
variantId: v.nullish(comparable("number")),
affiliationLinkId: v.nullish(comparable("number")),
totalPrice: v.nullish(comparable("number")),
totalDiscountedPrice: v.nullish(comparable("number")),
promoCodeApplied: v.nullish(comparable("bool")),
appliedpromotionsIds: v.nullish(v.array(comparable("number")))})



export type TReadCartItemsSchema = v.InferOutput<typeof ReadCartItemsSchema>
export type TReadCartItemsSchemaInput = v.InferInput<typeof ReadCartItemsSchema>
