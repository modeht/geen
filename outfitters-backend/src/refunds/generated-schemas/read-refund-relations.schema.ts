import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';

export class ReadRefundRelationsSchemaRelations {}

export const ReadRefundRelationsSchema: v.GenericSchema<ReadRefundRelationsSchemaRelations> = v.object({})



export type TReadRefundRelationsSchemaOutput = v.InferOutput<typeof ReadRefundRelationsSchema>;
export type TReadRefundRelationsSchemaInput = v.InferInput<typeof ReadRefundRelationsSchema>;
