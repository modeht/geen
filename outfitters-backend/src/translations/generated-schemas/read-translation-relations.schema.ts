import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';

import { LanguageEnum } from '../../../lib/enums';
export class ReadTranslationRelations {
	language?: LanguageEnum | null;
}

const ReadTranslationRelationsSchema: v.GenericSchema<ReadTranslationRelations> = v.object({
	language: v.nullish(v.enum(LanguageEnum)),
});

export default ReadTranslationRelationsSchema;

export type TReadTranslationRelationsSchemaOutput = v.InferOutput<typeof ReadTranslationRelationsSchema>;
export type TReadTranslationRelationsSchemaInput = v.InferInput<typeof ReadTranslationRelationsSchema>;
