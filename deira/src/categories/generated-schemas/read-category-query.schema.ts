import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadCategoryFiltersSchema from './read-category-filters.schema';
import ReadCategoryRelationsSchema from './read-category-relations.schema';
import ReadCategoryOrdersSchema from './read-category-orders.schema';
const ReadCategorySchema = v.optional(
	v.object({
		filters: v.optional(ReadCategoryFiltersSchema),
		relations: v.optional(ReadCategoryRelationsSchema),
		orders: v.optional(ReadCategoryOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadCategorySchema;
export type TReadCategorySchemaInput = v.InferInput<typeof ReadCategorySchema>;
export type TReadCategorySchemaOutput = v.InferOutput<typeof ReadCategorySchema>;
