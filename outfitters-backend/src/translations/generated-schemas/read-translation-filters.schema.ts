import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';


import { LanguageEnum } from '../../../lib/enums'
export class ReadTranslationFiltersSchemaFilters {language?: LanguageEnum | null | undefined}

export const ReadTranslationFiltersSchema: v.GenericSchema<ReadTranslationFiltersSchemaFilters> = v.object({language: v.nullish(v.enum(LanguageEnum))})



export type TReadTranslationFiltersSchemaOutput = v.InferOutput<typeof ReadTranslationFiltersSchema>;
export type TReadTranslationFiltersSchemaInput = v.InferInput<typeof ReadTranslationFiltersSchema>;
