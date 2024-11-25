import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';



export class ReadRefundOrders {}

export const ReadRefundOrdersSchema: v.GenericSchema<ReadRefundOrders> = v.object({})



export type TReadRefundOrdersSchemaOutput = v.InferOutput<typeof ReadRefundOrdersSchema>;
export type TReadRefundOrdersSchemaInput = v.InferInput<typeof ReadRefundOrdersSchema>;
