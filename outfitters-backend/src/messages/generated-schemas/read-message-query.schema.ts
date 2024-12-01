import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadMessageFiltersSchema from './read-message-filters.schema';
import ReadMessageRelationsSchema from './read-message-relations.schema';
import ReadMessageOrdersSchema from './read-message-orders.schema';
const ReadMessageSchema = v.optional(v.object({
filters: v.undefinedable(ReadMessageFiltersSchema),
relations: v.undefinedable(ReadMessageRelationsSchema),
orders: v.undefinedable(ReadMessageOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadMessageSchema;
export type TReadMessageSchemaInput = v.InferInput<typeof ReadMessageSchema>;
export type TReadMessageSchemaOutput = v.InferOutput<typeof ReadMessageSchema>;