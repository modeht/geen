import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';



export class ReadRefundFiltersSchemaFilters {}

const ReadRefundFiltersSchema: v.GenericSchema<ReadRefundFiltersSchemaFilters> = v.object({});

export default ReadRefundFiltersSchema;




export type TReadRefundFiltersSchemaOutput = v.InferOutput<typeof ReadRefundFiltersSchema>;
export type TReadRefundFiltersSchemaInput = v.InferInput<typeof ReadRefundFiltersSchema>;
