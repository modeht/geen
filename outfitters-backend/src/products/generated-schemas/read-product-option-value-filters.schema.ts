import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadProductOptionFiltersSchema, { ReadProductOptionFiltersSchemaFilters } from './read-product-option-filters.schema'
import ReadProductVariantFiltersSchema, { ReadProductVariantFiltersSchemaFilters } from './read-product-variant-filters.schema'



export class ReadProductOptionValueFiltersSchemaFilters {value?: GenericComparable<"string"> | null;
optionName?: GenericComparable<"string"> | null;
productId?: GenericComparable<"number"> | null;
option?: ReadProductOptionFiltersSchemaFilters | null;
variants?: ReadProductVariantFiltersSchemaFilters | null}

const ReadProductOptionValueFiltersSchema: v.GenericSchema<ReadProductOptionValueFiltersSchemaFilters> = v.object({value: v.nullish(comparable("string")),
optionName: v.nullish(comparable("string")),
productId: v.nullish(comparable("number")),
option: v.nullish(v.lazy(() => ReadProductOptionFiltersSchema)),
variants: v.nullish(v.lazy(() => ReadProductVariantFiltersSchema))});

export default ReadProductOptionValueFiltersSchema;




export type TReadProductOptionValueFiltersSchemaOutput = v.InferOutput<typeof ReadProductOptionValueFiltersSchema>;
export type TReadProductOptionValueFiltersSchemaInput = v.InferInput<typeof ReadProductOptionValueFiltersSchema>;
