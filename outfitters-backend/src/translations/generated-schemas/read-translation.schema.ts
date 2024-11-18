import * as v from 'valibot';
import { ReadTranslationFiltersSchema } from './read-translation-filters.schema';
import { ReadTranslationRelationsSchema } from './read-translation-relations.schema';
export const ReadTranslationSchema = v.object({
filters: v.nullish(ReadTranslationFiltersSchema),
relations: v.nullish(ReadTranslationRelationsSchema),
});
export type TReadTranslationSchemaInput = v.InferInput<typeof ReadTranslationSchema>;
export type TReadTranslationSchemaOutput = v.InferOutput<typeof ReadTranslationSchema>;
