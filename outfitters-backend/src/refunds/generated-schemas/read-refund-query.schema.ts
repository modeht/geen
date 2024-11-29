import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadRefundFiltersSchema } from './read-refund-filters.schema';
import { ReadRefundRelationsSchema } from './read-refund-relations.schema';
import { ReadRefundOrdersSchema } from './read-refund-orders.schema';
const ReadRefundSchema = v.optional(v.object({
filters: v.undefinedable(ReadRefundFiltersSchema),
relations: v.undefinedable(ReadRefundRelationsSchema),
orders: v.undefinedable(ReadRefundOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadRefundSchema;
export type TReadRefundSchemaInput = v.InferInput<typeof ReadRefundSchema>;
export type TReadRefundSchemaOutput = v.InferOutput<typeof ReadRefundSchema>;
