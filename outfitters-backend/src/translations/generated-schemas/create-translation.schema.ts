import * as v from 'valibot';


import { LanguageEnum } from '../../../lib/enums'
export const CreateTranslationSchema = v.pipe(v.object({language: v.enum(LanguageEnum)}),v.metadata({}))

export type TCreateTranslationSchemaInput = v.InferInput<typeof CreateTranslationSchema>;
export type TCreateTranslationSchemaOutput = v.InferOutput<typeof CreateTranslationSchema>;
