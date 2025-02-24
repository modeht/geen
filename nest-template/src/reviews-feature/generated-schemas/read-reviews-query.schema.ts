import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadReviewsFiltersSchema from './read-reviews-filters.schema';
import ReadReviewsRelationsSchema from './read-reviews-relations.schema';
import ReadReviewsOrdersSchema from './read-reviews-orders.schema';
const ReadReviewsSchema = v.optional(
	v.object({
		filters: v.optional(ReadReviewsFiltersSchema),
		relations: v.optional(ReadReviewsRelationsSchema),
		orders: v.optional(ReadReviewsOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadReviewsSchema;
export type TReadReviewsSchemaInput = v.InferInput<typeof ReadReviewsSchema>;
export type TReadReviewsSchemaOutput = v.InferOutput<typeof ReadReviewsSchema>;
