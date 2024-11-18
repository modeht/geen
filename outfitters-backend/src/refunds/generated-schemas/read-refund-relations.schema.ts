import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';



export class ReadRefundRelations {}

export const ReadRefundRelationsSchema: v.GenericSchema<ReadRefundRelations> = v.object({})



export type TReadRefundRelationsSchemaOutput = v.InferOutput<typeof ReadRefundRelationsSchema>;
export type TReadRefundRelationsSchemaInput = v.InferInput<typeof ReadRefundRelationsSchema>;
