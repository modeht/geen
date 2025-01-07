import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadRatingFiltersSchema from './read-rating-filters.schema';
import ReadRatingRelationsSchema from './read-rating-relations.schema';
import ReadRatingOrdersSchema from './read-rating-orders.schema';
const ReadRatingSchema = v.optional(
	v.object({
		filters: v.optional(ReadRatingFiltersSchema),
		relations: v.optional(ReadRatingRelationsSchema),
		orders: v.optional(ReadRatingOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadRatingSchema;
export type TReadRatingSchemaInput = v.InferInput<typeof ReadRatingSchema>;
export type TReadRatingSchemaOutput = v.InferOutput<typeof ReadRatingSchema>;
