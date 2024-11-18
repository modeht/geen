import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductOptionFiltersSchema, ReadProductOptionFiltersSchemaFilters } from './read-product-option-filters.schema'
import { ReadProductVariantFiltersSchema, ReadProductVariantFiltersSchemaFilters } from './read-product-variant-filters.schema'

export class ReadProductOptionValueFiltersSchemaFilters {value?: GenericComparable<"string"> | null | undefined;
optionName?: GenericComparable<"string"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
option?: ReadProductOptionFiltersSchemaFilters | null | undefined;
variants?: ReadProductVariantFiltersSchemaFilters | null | undefined}

export const ReadProductOptionValueFiltersSchema: v.GenericSchema<ReadProductOptionValueFiltersSchemaFilters> = v.object({value: v.nullish(comparable("string")),
optionName: v.nullish(comparable("string")),
productId: v.nullish(comparable("number")),
option: v.nullish(v.lazy(() => ReadProductOptionFiltersSchema)),
variants: v.nullish(v.lazy(() => ReadProductVariantFiltersSchema))})



export type TReadProductOptionValueSchemaOutput = v.InferOutput<typeof ReadProductOptionValueFiltersSchema>;
export type TReadProductOptionValueSchemaInput = v.InferInput<typeof ReadProductOptionValueFiltersSchema>;
