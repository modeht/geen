import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadCategoryFiltersSchema from './read-category-filters.schema';
import ReadCategoryRelationsSchema from './read-category-relations.schema';
import ReadCategoryOrdersSchema from './read-category-orders.schema';
const ReadCategorySchema = v.optional(v.object({
filters: v.undefinedable(ReadCategoryFiltersSchema),
relations: v.undefinedable(ReadCategoryRelationsSchema),
orders: v.undefinedable(ReadCategoryOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadCategorySchema;
export type TReadCategorySchemaInput = v.InferInput<typeof ReadCategorySchema>;
export type TReadCategorySchemaOutput = v.InferOutput<typeof ReadCategorySchema>;
