import * as v from 'valibot';
import { ReadCommentFiltersSchema } from './read-comment-filters.schema';
import { ReadCommentRelationsSchema } from './read-comment-relations.schema';
import { ReadCommentOrdersSchema } from './read-comment-orders.schema';
export const ReadCommentSchema = v.object({
filters: v.undefinedable(ReadCommentFiltersSchema),
relations: v.undefinedable(ReadCommentRelationsSchema),
orders: v.undefinedable(ReadCommentOrdersSchema),
});
export type TReadCommentSchemaInput = v.InferInput<typeof ReadCommentSchema>;
export type TReadCommentSchemaOutput = v.InferOutput<typeof ReadCommentSchema>;
