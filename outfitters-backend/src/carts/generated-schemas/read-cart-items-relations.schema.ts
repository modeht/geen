import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadCartRelationsSchema, ReadCartRelations } from './read-cart-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelations } from '../../products/generated-schemas/read-product-variant-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'



export class ReadCartItemsRelations {cart?: ReadCartRelations | boolean | null | undefined;
product?: ReadProductRelations | boolean | null | undefined;
variant?: ReadProductVariantRelations | boolean | null | undefined;
affiliationLink?: ReadAffiliationLinkRelations | boolean | null | undefined}

export const ReadCartItemsRelationsSchema: v.GenericSchema<ReadCartItemsRelations> = v.object({cart: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
variant: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductVariantRelationsSchema)])),
affiliationLink: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkRelationsSchema)]))})



export type TReadCartItemsRelationsSchemaOutput = v.InferOutput<typeof ReadCartItemsRelationsSchema>;
export type TReadCartItemsRelationsSchemaInput = v.InferInput<typeof ReadCartItemsRelationsSchema>;
