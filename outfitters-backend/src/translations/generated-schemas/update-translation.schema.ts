import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { LanguageEnum } from '../../../lib/enums';
const UpdateTranslationSchema = v.pipe(
	v.object({ language: v.optional(v.enum(LanguageEnum)) }),
	v.metadata({ [modelSymbol]: 'TranslationEntity' }),
);
export default UpdateTranslationSchema;

export type TUpdateTranslationSchemaInput = v.InferInput<typeof UpdateTranslationSchema>;
export type TUpdateTranslationSchemaOutput = v.InferOutput<typeof UpdateTranslationSchema>;
