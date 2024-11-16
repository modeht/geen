import * as v from 'valibot';

export const CreateRefundSchema = v.pipe(v.object({}),v.metadata({}))

export type TCreateRefundSchema = v.InferInput<typeof CreateRefundSchema>
