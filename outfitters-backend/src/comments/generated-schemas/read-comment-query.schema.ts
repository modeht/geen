import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadCommentFiltersSchema from './read-comment-filters.schema';
import ReadCommentRelationsSchema from './read-comment-relations.schema';
import ReadCommentOrdersSchema from './read-comment-orders.schema';
const ReadCommentSchema = v.optional(v.object({
filters: v.undefinedable(ReadCommentFiltersSchema),
relations: v.undefinedable(ReadCommentRelationsSchema),
orders: v.undefinedable(ReadCommentOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadCommentSchema;
export type TReadCommentSchemaInput = v.InferInput<typeof ReadCommentSchema>;
export type TReadCommentSchemaOutput = v.InferOutput<typeof ReadCommentSchema>;