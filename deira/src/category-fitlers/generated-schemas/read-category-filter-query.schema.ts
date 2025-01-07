import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadCategoryFilterFiltersSchema from './read-category-filter-filters.schema';
import ReadCategoryFilterRelationsSchema from './read-category-filter-relations.schema';
import ReadCategoryFilterOrdersSchema from './read-category-filter-orders.schema';
const ReadCategoryFilterSchema = v.optional(
	v.object({
		filters: v.optional(ReadCategoryFilterFiltersSchema),
		relations: v.optional(ReadCategoryFilterRelationsSchema),
		orders: v.optional(ReadCategoryFilterOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadCategoryFilterSchema;
export type TReadCategoryFilterSchemaInput = v.InferInput<typeof ReadCategoryFilterSchema>;
export type TReadCategoryFilterSchemaOutput = v.InferOutput<typeof ReadCategoryFilterSchema>;
