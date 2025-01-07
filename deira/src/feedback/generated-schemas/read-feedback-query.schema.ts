import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadFeedbackFiltersSchema from './read-feedback-filters.schema';
import ReadFeedbackRelationsSchema from './read-feedback-relations.schema';
import ReadFeedbackOrdersSchema from './read-feedback-orders.schema';
const ReadFeedbackSchema = v.optional(
	v.object({
		filters: v.optional(ReadFeedbackFiltersSchema),
		relations: v.optional(ReadFeedbackRelationsSchema),
		orders: v.optional(ReadFeedbackOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadFeedbackSchema;
export type TReadFeedbackSchemaInput = v.InferInput<typeof ReadFeedbackSchema>;
export type TReadFeedbackSchemaOutput = v.InferOutput<typeof ReadFeedbackSchema>;
