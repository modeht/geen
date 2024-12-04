import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadTaggedProductRelationsSchema, { ReadTaggedProductRelations } from '../../products/generated-schemas/read-tagged-product-relations.schema'
import ReadCartItemsRelationsSchema, { ReadCartItemsRelations } from '../../carts/generated-schemas/read-cart-items-relations.schema'
import ReadAffiliationLinkTrackingRelationsSchema, { ReadAffiliationLinkTrackingRelations } from './read-affiliation-link-tracking-relations.schema'
import ReadShopperProfileRelationsSchema, { ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import ReadProductRelationsSchema, { ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'



export class ReadAffiliationLinkRelations {taggedProducts?: ReadTaggedProductRelations | string | boolean;
cartItems?: ReadCartItemsRelations | string | boolean;
affiliationLinkTracking?: ReadAffiliationLinkTrackingRelations | string | boolean;
shopperProfile?: ReadShopperProfileRelations | string | boolean;
product?: ReadProductRelations | string | boolean}

const ReadAffiliationLinkRelationsSchema: v.GenericSchema<ReadAffiliationLinkRelations> = v.object({taggedProducts: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadTaggedProductRelationsSchema)])),
cartItems: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCartItemsRelationsSchema)])),
affiliationLinkTracking: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadAffiliationLinkTrackingRelationsSchema)])),
shopperProfile: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadShopperProfileRelationsSchema)])),
product: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)]))});

export default ReadAffiliationLinkRelationsSchema;




export type TReadAffiliationLinkRelationsSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkRelationsSchema>;
export type TReadAffiliationLinkRelationsSchemaInput = v.InferInput<typeof ReadAffiliationLinkRelationsSchema>;
