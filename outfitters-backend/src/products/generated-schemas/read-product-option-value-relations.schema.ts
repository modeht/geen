import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductOptionRelationsSchema, ReadProductOptionRelationsSchemaRelations } from './read-product-option-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelationsSchemaRelations } from './read-product-variant-relations.schema'

export class ReadProductOptionValueRelationsSchemaRelations {option?: ReadProductOptionRelationsSchemaRelations | boolean | null | undefined;
variants?: ReadProductVariantRelationsSchemaRelations | boolean | null | undefined}

export const ReadProductOptionValueRelationsSchema: v.GenericSchema<ReadProductOptionValueRelationsSchemaRelations> = v.object({option: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductOptionRelationsSchema)])),
variants: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductVariantRelationsSchema)]))})



export type TReadProductOptionValueRelationsSchemaOutput = v.InferOutput<typeof ReadProductOptionValueRelationsSchema>;
export type TReadProductOptionValueRelationsSchemaInput = v.InferInput<typeof ReadProductOptionValueRelationsSchema>;
