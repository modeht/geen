import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadProductReviewFiltersSchema } from './read-product-review-filters.schema';
import { ReadProductReviewRelationsSchema } from './read-product-review-relations.schema';
import { ReadProductReviewOrdersSchema } from './read-product-review-orders.schema';
export const ReadProductReviewSchema = v.object({
filters: v.undefinedable(ReadProductReviewFiltersSchema),
relations: v.undefinedable(ReadProductReviewRelationsSchema),
orders: v.undefinedable(ReadProductReviewOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadProductReviewSchemaInput = v.InferInput<typeof ReadProductReviewSchema>;
export type TReadProductReviewSchemaOutput = v.InferOutput<typeof ReadProductReviewSchema>;
