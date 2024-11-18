import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelationsSchemaRelations } from '../../products/generated-schemas/read-tagged-product-relations.schema'
import { ReadCartItemsRelationsSchema, ReadCartItemsRelationsSchemaRelations } from '../../carts/generated-schemas/read-cart-items-relations.schema'
import { ReadAffiliationLinkTrackingRelationsSchema, ReadAffiliationLinkTrackingRelationsSchemaRelations } from './read-affiliation-link-tracking-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'

export class ReadAffiliationLinkRelationsSchemaRelations {taggedProducts?: ReadTaggedProductRelationsSchemaRelations | boolean | null | undefined;
cartItems?: ReadCartItemsRelationsSchemaRelations | boolean | null | undefined;
affiliationLinkTracking?: ReadAffiliationLinkTrackingRelationsSchemaRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelationsSchemaRelations | boolean | null | undefined;
product?: ReadProductRelationsSchemaRelations | boolean | null | undefined}

export const ReadAffiliationLinkRelationsSchema: v.GenericSchema<ReadAffiliationLinkRelationsSchemaRelations> = v.object({taggedProducts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadTaggedProductRelationsSchema)])),
cartItems: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartItemsRelationsSchema)])),
affiliationLinkTracking: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkTrackingRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadAffiliationLinkRelationsSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkRelationsSchema>;
export type TReadAffiliationLinkRelationsSchemaInput = v.InferInput<typeof ReadAffiliationLinkRelationsSchema>;
