import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadReviewsRelationsSchema from './read-reviews-relations.schema';
const ReadOneReviewsSchema = v.optional(
	v.object({
		relations: v.optional(ReadReviewsRelationsSchema),
	}),
);
export default ReadOneReviewsSchema;
export type TReadOneReviewsSchemaInput = v.InferInput<typeof ReadOneReviewsSchema>;
export type TReadOneReviewsSchemaOutput = v.InferOutput<typeof ReadOneReviewsSchema>;
