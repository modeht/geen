import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { LanguageEnum } from '../../../lib/enums';
const CreateTranslationSchema = v.pipe(
	v.object({ columns: v.nullish(v.any()), language: v.enum(LanguageEnum) }),
	v.metadata({ [modelSymbol]: 'TranslationEntity' }),
);
export default CreateTranslationSchema;

export type TCreateTranslationSchemaInput = v.InferInput<typeof CreateTranslationSchema>;
export type TCreateTranslationSchemaOutput = v.InferOutput<typeof CreateTranslationSchema>;
