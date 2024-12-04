import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadCartFiltersSchema, { ReadCartFiltersSchemaFilters } from './read-cart-filters.schema'
import ReadProductFiltersSchema, { ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'
import ReadProductVariantFiltersSchema, { ReadProductVariantFiltersSchemaFilters } from '../../products/generated-schemas/read-product-variant-filters.schema'
import ReadAffiliationLinkFiltersSchema, { ReadAffiliationLinkFiltersSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link-filters.schema'



export class ReadCartItemsFiltersSchemaFilters {quantity?: GenericComparable<"number"> | null;
cart?: ReadCartFiltersSchemaFilters | null;
product?: ReadProductFiltersSchemaFilters | null;
variant?: ReadProductVariantFiltersSchemaFilters | null;
affiliationLink?: ReadAffiliationLinkFiltersSchemaFilters | null;
cartId?: GenericComparable<"number"> | null;
productId?: GenericComparable<"number"> | null;
variantId?: GenericComparable<"number"> | null;
affiliationLinkId?: GenericComparable<"number"> | null;
totalPrice?: GenericComparable<"number"> | null;
totalDiscountedPrice?: GenericComparable<"number"> | null;
promoCodeApplied?: GenericComparable<"bool"> | null;
appliedpromotionsIds?: GenericComparable<"number">[] | null}

const ReadCartItemsFiltersSchema: v.GenericSchema<ReadCartItemsFiltersSchemaFilters> = v.object({quantity: v.nullish(comparable("number")),
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
appliedpromotionsIds: v.nullish(v.array(comparable("number")))});

export default ReadCartItemsFiltersSchema;




export type TReadCartItemsFiltersSchemaOutput = v.InferOutput<typeof ReadCartItemsFiltersSchema>;
export type TReadCartItemsFiltersSchemaInput = v.InferInput<typeof ReadCartItemsFiltersSchema>;
