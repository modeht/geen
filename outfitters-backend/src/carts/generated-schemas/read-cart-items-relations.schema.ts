import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadCartRelationsSchema, ReadCartRelations } from './read-cart-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelations } from '../../products/generated-schemas/read-product-variant-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'



export class ReadCartItemsRelations {cart?: ReadCartRelations | string | boolean | undefined;
product?: ReadProductRelations | string | boolean | undefined;
variant?: ReadProductVariantRelations | string | boolean | undefined;
affiliationLink?: ReadAffiliationLinkRelations | string | boolean | undefined}

export const ReadCartItemsRelationsSchema: v.GenericSchema<ReadCartItemsRelations> = v.object({cart: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCartRelationsSchema)])),
product: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)])),
variant: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductVariantRelationsSchema)])),
affiliationLink: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadAffiliationLinkRelationsSchema)]))})



export type TReadCartItemsRelationsSchemaOutput = v.InferOutput<typeof ReadCartItemsRelationsSchema>;
export type TReadCartItemsRelationsSchemaInput = v.InferInput<typeof ReadCartItemsRelationsSchema>;
