import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from './read-product-relations.schema'
import { ReadProductOptionValueRelationsSchema, ReadProductOptionValueRelationsSchemaRelations } from './read-product-option-value-relations.schema'

export class ReadProductOptionRelationsSchemaRelations {product?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
values?: ReadProductOptionValueRelationsSchemaRelations | boolean | null | undefined}

export const ReadProductOptionRelationsSchema: v.GenericSchema<ReadProductOptionRelationsSchemaRelations> = v.object({product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
values: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductOptionValueRelationsSchema)]))})



export type TReadProductOptionRelationsSchemaOutput = v.InferOutput<typeof ReadProductOptionRelationsSchema>;
export type TReadProductOptionRelationsSchemaInput = v.InferInput<typeof ReadProductOptionRelationsSchema>;
