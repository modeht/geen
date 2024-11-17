import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadTaggedProductSchema, ReadTaggedProductSchemaFilters } from '../../products/generated-schemas/read-tagged-product.schema'
import { ReadCartItemsSchema, ReadCartItemsSchemaFilters } from '../../carts/generated-schemas/read-cart-items.schema'
import { ReadAffiliationLinkTrackingSchema, ReadAffiliationLinkTrackingSchemaFilters } from './read-affiliation-link-tracking.schema'
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from '../../users/generated-schemas/read-shopper-profile.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'

export class ReadAffiliationLinkSchemaFilters {isDisabled?: GenericComparable<"bool"> | null | undefined;
url?: GenericComparable<"string"> | null | undefined;
taggedProducts?: ReadTaggedProductSchemaFilters | null | undefined;
cartItems?: ReadCartItemsSchemaFilters | null | undefined;
affiliationLinkTracking?: ReadAffiliationLinkTrackingSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileSchemaFilters | null | undefined;
product?: ReadProductSchemaFilters | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined}

export const ReadAffiliationLinkSchema: v.GenericSchema<ReadAffiliationLinkSchemaFilters> = v.object({isDisabled: v.nullish(comparable("bool")),
url: v.nullish(comparable("string")),
taggedProducts: v.nullish(v.lazy(() => ReadTaggedProductSchema)),
cartItems: v.nullish(v.lazy(() => ReadCartItemsSchema)),
affiliationLinkTracking: v.nullish(v.lazy(() => ReadAffiliationLinkTrackingSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
product: v.nullish(v.lazy(() => ReadProductSchema)),
productId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number"))})



export type TReadAffiliationLinkSchema = v.InferOutput<typeof ReadAffiliationLinkSchema>
export type TReadAffiliationLinkSchemaInput = v.InferInput<typeof ReadAffiliationLinkSchema>
