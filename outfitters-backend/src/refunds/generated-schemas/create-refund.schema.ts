import * as v from 'valibot';



export const CreateRefundSchema = v.pipe(v.object({}),v.metadata({}))

export type TCreateRefundSchemaInput = v.InferInput<typeof CreateRefundSchema>;
export type TCreateRefundSchemaOutput = v.InferOutput<typeof CreateRefundSchema>;
