import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadCartFiltersSchema, ReadCartFiltersSchemaFilters } from './read-cart-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'
import { ReadProductVariantFiltersSchema, ReadProductVariantFiltersSchemaFilters } from '../../products/generated-schemas/read-product-variant-filters.schema'
import { ReadAffiliationLinkFiltersSchema, ReadAffiliationLinkFiltersSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link-filters.schema'

export class ReadCartItemsFiltersSchemaFilters {quantity?: GenericComparable<"number"> | null | undefined;
cart?: ReadCartFiltersSchemaFilters | null | undefined;
product?: ReadProductFiltersSchemaFilters | null | undefined;
variant?: ReadProductVariantFiltersSchemaFilters | null | undefined;
affiliationLink?: ReadAffiliationLinkFiltersSchemaFilters | null | undefined;
cartId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
variantId?: GenericComparable<"number"> | null | undefined;
affiliationLinkId?: GenericComparable<"number"> | null | undefined;
totalPrice?: GenericComparable<"number"> | null | undefined;
totalDiscountedPrice?: GenericComparable<"number"> | null | undefined;
promoCodeApplied?: GenericComparable<"bool"> | null | undefined;
appliedpromotionsIds?: GenericComparable<"number">[] | null | undefined}

export const ReadCartItemsFiltersSchema: v.GenericSchema<ReadCartItemsFiltersSchemaFilters> = v.object({quantity: v.nullish(comparable("number")),
cart: v.nullish(v.lazy(() => ReadCartFiltersSchema)),
product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
variant: v.nullish(v.lazy(() => ReadProductVariantFiltersSchema)),
affiliationLink: v.nullish(v.lazy(() => ReadAffiliationLinkFiltersSchema)),
cartId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number")),
variantId: v.nullish(comparable("number")),
affiliationLinkId: v.nullish(comparable("number")),
totalPrice: v.nullish(comparable("number")),
totalDiscountedPrice: v.nullish(comparable("number")),
promoCodeApplied: v.nullish(comparable("bool")),
appliedpromotionsIds: v.nullish(v.array(comparable("number")))})



export type TReadCartItemsFiltersSchemaOutput = v.InferOutput<typeof ReadCartItemsFiltersSchema>;
export type TReadCartItemsFiltersSchemaInput = v.InferInput<typeof ReadCartItemsFiltersSchema>;
