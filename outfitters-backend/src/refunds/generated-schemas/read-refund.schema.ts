import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';

export class ReadRefundSchemaFilters {}

export const ReadRefundSchema: v.GenericSchema<ReadRefundSchemaFilters> = v.object({})



export type TReadRefundSchema = v.InferOutput<typeof ReadRefundSchema>
export type TReadRefundSchemaInput = v.InferInput<typeof ReadRefundSchema>
