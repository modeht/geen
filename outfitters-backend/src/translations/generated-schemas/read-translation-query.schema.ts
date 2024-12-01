import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadTranslationFiltersSchema from './read-translation-filters.schema';
import ReadTranslationRelationsSchema from './read-translation-relations.schema';
import ReadTranslationOrdersSchema from './read-translation-orders.schema';
const ReadTranslationSchema = v.optional(v.object({
filters: v.undefinedable(ReadTranslationFiltersSchema),
relations: v.undefinedable(ReadTranslationRelationsSchema),
orders: v.undefinedable(ReadTranslationOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadTranslationSchema;
export type TReadTranslationSchemaInput = v.InferInput<typeof ReadTranslationSchema>;
export type TReadTranslationSchemaOutput = v.InferOutput<typeof ReadTranslationSchema>;