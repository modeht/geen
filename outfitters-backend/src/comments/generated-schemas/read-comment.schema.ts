import * as v from 'valibot';
import { ReadCommentFiltersSchema } from './read-comment-filters.schema';
import { ReadCommentRelationsSchema } from './read-comment-relations.schema';
export const ReadCommentSchema = v.object({
filters: ReadCommentFiltersSchema,
relations: ReadCommentRelationsSchema,
});
export type TReadCommentSchemaInput = v.InferInput<typeof ReadCommentSchema>;
export type TReadCommentSchemaOutput = v.InferOutput<typeof ReadCommentSchema>;
