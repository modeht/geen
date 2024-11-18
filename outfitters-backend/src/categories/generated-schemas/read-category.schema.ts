import * as v from 'valibot';
import { ReadCategoryFiltersSchema } from './read-category-filters.schema';
import { ReadCategoryRelationsSchema } from './read-category-relations.schema';
export const ReadCategorySchema = v.object({
filters: v.nullish(ReadCategoryFiltersSchema),
relations: v.nullish(ReadCategoryRelationsSchema),
});
export type TReadCategorySchemaInput = v.InferInput<typeof ReadCategorySchema>;
export type TReadCategorySchemaOutput = v.InferOutput<typeof ReadCategorySchema>;
