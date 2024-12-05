import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadProductReviewFiltersSchema from './read-product-review-filters.schema';
import ReadProductReviewRelationsSchema from './read-product-review-relations.schema';
import ReadProductReviewOrdersSchema from './read-product-review-orders.schema';
const ReadProductReviewSchema = v.optional(v.object({
filters: v.optional(ReadProductReviewFiltersSchema),
relations: v.optional(ReadProductReviewRelationsSchema),
orders: v.optional(ReadProductReviewOrdersSchema),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));
export default ReadProductReviewSchema;
export type TReadProductReviewSchemaInput = v.InferInput<typeof ReadProductReviewSchema>;
export type TReadProductReviewSchemaOutput = v.InferOutput<typeof ReadProductReviewSchema>;
