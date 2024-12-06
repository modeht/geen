import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadCommentFiltersSchema from './read-comment-filters.schema';
import ReadCommentRelationsSchema from './read-comment-relations.schema';
import ReadCommentOrdersSchema from './read-comment-orders.schema';
const ReadCommentSchema = v.optional(
	v.object({
		filters: v.optional(ReadCommentFiltersSchema),
		relations: v.optional(ReadCommentRelationsSchema),
		orders: v.optional(ReadCommentOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadCommentSchema;
export type TReadCommentSchemaInput = v.InferInput<typeof ReadCommentSchema>;
export type TReadCommentSchemaOutput = v.InferOutput<typeof ReadCommentSchema>;
