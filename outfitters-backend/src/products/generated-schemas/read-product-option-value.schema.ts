import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductOptionSchema, ReadProductOptionSchemaFilters } from './read-product-option.schema'
import { ReadProductVariantSchema, ReadProductVariantSchemaFilters } from './read-product-variant.schema'

export class ReadProductOptionValueSchemaFilters {value?: GenericComparable<"string"> | null | undefined;
optionName?: GenericComparable<"string"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
option?: ReadProductOptionSchemaFilters | null | undefined;
variants?: ReadProductVariantSchemaFilters | null | undefined}

export const ReadProductOptionValueSchema: v.GenericSchema<ReadProductOptionValueSchemaFilters> = v.object({value: v.nullish(comparable("string")),
optionName: v.nullish(comparable("string")),
productId: v.nullish(comparable("number")),
option: v.nullish(v.lazy(() => ReadProductOptionSchema)),
variants: v.nullish(v.lazy(() => ReadProductVariantSchema))})



export type TReadProductOptionValueSchema = v.InferOutput<typeof ReadProductOptionValueSchema>
export type TReadProductOptionValueSchemaInput = v.InferInput<typeof ReadProductOptionValueSchema>
