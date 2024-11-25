import * as v from 'valibot';
import { ReadCategoryFiltersSchema } from './read-category-filters.schema';
import { ReadCategoryRelationsSchema } from './read-category-relations.schema';
import { ReadCategoryOrdersSchema } from './read-category-orders.schema';
export const ReadCategorySchema = v.object({
filters: v.undefinedable(ReadCategoryFiltersSchema),
relations: v.undefinedable(ReadCategoryRelationsSchema),
orders: v.undefinedable(ReadCategoryOrdersSchema),
});
export type TReadCategorySchemaInput = v.InferInput<typeof ReadCategorySchema>;
export type TReadCategorySchemaOutput = v.InferOutput<typeof ReadCategorySchema>;
