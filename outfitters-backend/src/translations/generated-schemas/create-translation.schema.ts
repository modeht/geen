import * as v from 'valibot';

export const CreateTranslationSchema = v.pipe(v.object({}),v.metadata({}))

export type TCreateTranslationSchema = v.InferInput<typeof CreateTranslationSchema>
