import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';

export class ReadRefundFiltersSchemaFilters {}

export const ReadRefundFiltersSchema: v.GenericSchema<ReadRefundFiltersSchemaFilters> = v.object({})



export type TReadRefundSchemaOutput = v.InferOutput<typeof ReadRefundFiltersSchema>;
export type TReadRefundSchemaInput = v.InferInput<typeof ReadRefundFiltersSchema>;
