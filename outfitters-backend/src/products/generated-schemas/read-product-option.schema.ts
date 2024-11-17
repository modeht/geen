import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductSchema, ReadProductSchemaFilters } from './read-product.schema'
import { ReadProductOptionValueSchema, ReadProductOptionValueSchemaFilters } from './read-product-option-value.schema'

export class ReadProductOptionSchemaFilters {name?: GenericComparable<"string"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
product?: ReadProductSchemaFilters | null | undefined;
values?: ReadProductOptionValueSchemaFilters | null | undefined}

export const ReadProductOptionSchema: v.GenericSchema<ReadProductOptionSchemaFilters> = v.object({name: v.nullish(comparable("string")),
productId: v.nullish(comparable("number")),
product: v.nullish(v.lazy(() => ReadProductSchema)),
values: v.nullish(v.lazy(() => ReadProductOptionValueSchema))})



export type TReadProductOptionSchema = v.InferOutput<typeof ReadProductOptionSchema>
export type TReadProductOptionSchemaInput = v.InferInput<typeof ReadProductOptionSchema>
