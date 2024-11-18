import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductOptionRelationsSchema, ReadProductOptionRelations } from './read-product-option-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelations } from './read-product-variant-relations.schema'



export class ReadProductOptionValueRelations {option?: ReadProductOptionRelations | boolean | null | undefined;
variants?: ReadProductVariantRelations | boolean | null | undefined}

export const ReadProductOptionValueRelationsSchema: v.GenericSchema<ReadProductOptionValueRelations> = v.object({option: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductOptionRelationsSchema)])),
variants: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductVariantRelationsSchema)]))})



export type TReadProductOptionValueRelationsSchemaOutput = v.InferOutput<typeof ReadProductOptionValueRelationsSchema>;
export type TReadProductOptionValueRelationsSchemaInput = v.InferInput<typeof ReadProductOptionValueRelationsSchema>;
