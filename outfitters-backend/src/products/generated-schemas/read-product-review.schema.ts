import * as v from 'valibot';
import { ReadProductReviewFiltersSchema } from './read-product-review-filters.schema';
import { ReadProductReviewRelationsSchema } from './read-product-review-relations.schema';
export const ReadProductReviewSchema = v.object({
filters: ReadProductReviewFiltersSchema,
relations: ReadProductReviewRelationsSchema,
});
export type TReadProductReviewSchemaInput = v.InferInput<typeof ReadProductReviewSchema>;
export type TReadProductReviewSchemaOutput = v.InferOutput<typeof ReadProductReviewSchema>;
