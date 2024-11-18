import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';

export class ReadTranslationFiltersSchemaFilters {}

export const ReadTranslationFiltersSchema: v.GenericSchema<ReadTranslationFiltersSchemaFilters> = v.object({})



export type TReadTranslationFiltersSchemaOutput = v.InferOutput<typeof ReadTranslationFiltersSchema>;
export type TReadTranslationFiltersSchemaInput = v.InferInput<typeof ReadTranslationFiltersSchema>;
