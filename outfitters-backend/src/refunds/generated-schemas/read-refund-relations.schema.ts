import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';



export class ReadRefundRelations {}

const ReadRefundRelationsSchema: v.GenericSchema<ReadRefundRelations> = v.object({});

export default ReadRefundRelationsSchema;




export type TReadRefundRelationsSchemaOutput = v.InferOutput<typeof ReadRefundRelationsSchema>;
export type TReadRefundRelationsSchemaInput = v.InferInput<typeof ReadRefundRelationsSchema>;
