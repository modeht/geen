import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';

export class ReadTranslationSchemaFilters {}

export const ReadTranslationSchema: v.GenericSchema<ReadTranslationSchemaFilters> = v.object({})



export type TReadTranslationSchema = v.InferOutput<typeof ReadTranslationSchema>
export type TReadTranslationSchemaInput = v.InferInput<typeof ReadTranslationSchema>
