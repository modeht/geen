import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadRefundFiltersSchema from './read-refund-filters.schema';
import ReadRefundRelationsSchema from './read-refund-relations.schema';
import ReadRefundOrdersSchema from './read-refund-orders.schema';
const ReadRefundSchema = v.optional(v.object({
filters: v.optional(ReadRefundFiltersSchema),
relations: v.optional(ReadRefundRelationsSchema),
orders: v.optional(ReadRefundOrdersSchema),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));
export default ReadRefundSchema;
export type TReadRefundSchemaInput = v.InferInput<typeof ReadRefundSchema>;
export type TReadRefundSchemaOutput = v.InferOutput<typeof ReadRefundSchema>;
