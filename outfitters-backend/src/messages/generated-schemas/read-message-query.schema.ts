import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadMessageFiltersSchema from './read-message-filters.schema';
import ReadMessageRelationsSchema from './read-message-relations.schema';
import ReadMessageOrdersSchema from './read-message-orders.schema';
const ReadMessageSchema = v.optional(v.object({
filters: v.optional(ReadMessageFiltersSchema),
relations: v.optional(ReadMessageRelationsSchema),
orders: v.optional(ReadMessageOrdersSchema),
pagination: v.optional(ReadPaginationSchema),
}));
export default ReadMessageSchema;
export type TReadMessageSchemaInput = v.InferInput<typeof ReadMessageSchema>;
export type TReadMessageSchemaOutput = v.InferOutput<typeof ReadMessageSchema>;
