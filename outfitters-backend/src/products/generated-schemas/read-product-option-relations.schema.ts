import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductRelationsSchema, ReadProductRelations } from './read-product-relations.schema'
import { ReadProductOptionValueRelationsSchema, ReadProductOptionValueRelations } from './read-product-option-value-relations.schema'



export class ReadProductOptionRelations {product?: ReadProductRelations | boolean | null | undefined;
values?: ReadProductOptionValueRelations | boolean | null | undefined}

export const ReadProductOptionRelationsSchema: v.GenericSchema<ReadProductOptionRelations> = v.object({product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
values: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductOptionValueRelationsSchema)]))})



export type TReadProductOptionRelationsSchemaOutput = v.InferOutput<typeof ReadProductOptionRelationsSchema>;
export type TReadProductOptionRelationsSchemaInput = v.InferInput<typeof ReadProductOptionRelationsSchema>;
