import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from './read-product-filters.schema'
import { ReadProductOptionValueFiltersSchema, ReadProductOptionValueFiltersSchemaFilters } from './read-product-option-value-filters.schema'

export class ReadProductOptionFiltersSchemaFilters {name?: GenericComparable<"string"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
product?: ReadProductFiltersSchemaFilters | null | undefined;
values?: ReadProductOptionValueFiltersSchemaFilters | null | undefined}

export const ReadProductOptionFiltersSchema: v.GenericSchema<ReadProductOptionFiltersSchemaFilters> = v.object({name: v.nullish(comparable("string")),
productId: v.nullish(comparable("number")),
product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
values: v.nullish(v.lazy(() => ReadProductOptionValueFiltersSchema))})



export type TReadProductOptionSchemaOutput = v.InferOutput<typeof ReadProductOptionFiltersSchema>;
export type TReadProductOptionSchemaInput = v.InferInput<typeof ReadProductOptionFiltersSchema>;
