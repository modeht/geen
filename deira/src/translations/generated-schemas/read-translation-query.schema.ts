import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadTranslationFiltersSchema from './read-translation-filters.schema';
import ReadTranslationRelationsSchema from './read-translation-relations.schema';
import ReadTranslationOrdersSchema from './read-translation-orders.schema';
const ReadTranslationSchema = v.optional(
	v.object({
		filters: v.optional(ReadTranslationFiltersSchema),
		relations: v.optional(ReadTranslationRelationsSchema),
		orders: v.optional(ReadTranslationOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadTranslationSchema;
export type TReadTranslationSchemaInput = v.InferInput<typeof ReadTranslationSchema>;
export type TReadTranslationSchemaOutput = v.InferOutput<typeof ReadTranslationSchema>;
