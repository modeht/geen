import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';

export class ReadTranslationRelationsSchemaRelations {}

export const ReadTranslationRelationsSchema: v.GenericSchema<ReadTranslationRelationsSchemaRelations> = v.object({})



export type TReadTranslationRelationsSchemaOutput = v.InferOutput<typeof ReadTranslationRelationsSchema>;
export type TReadTranslationRelationsSchemaInput = v.InferInput<typeof ReadTranslationRelationsSchema>;
