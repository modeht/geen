import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadCartRelationsSchema, ReadCartRelationsSchemaRelations } from './read-cart-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelationsSchemaRelations } from '../../products/generated-schemas/read-product-variant-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelationsSchemaRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'

export class ReadCartItemsRelationsSchemaRelations {cart?: ReadCartRelationsSchemaRelations | boolean | null | undefined;
product?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
variant?: ReadProductVariantRelationsSchemaRelations | boolean | null | undefined;
affiliationLink?: ReadAffiliationLinkRelationsSchemaRelations | boolean | null | undefined}

export const ReadCartItemsRelationsSchema: v.GenericSchema<ReadCartItemsRelationsSchemaRelations> = v.object({cart: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
variant: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductVariantRelationsSchema)])),
affiliationLink: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkRelationsSchema)]))})



export type TReadCartItemsRelationsSchemaOutput = v.InferOutput<typeof ReadCartItemsRelationsSchema>;
export type TReadCartItemsRelationsSchemaInput = v.InferInput<typeof ReadCartItemsRelationsSchema>;
