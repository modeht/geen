import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadNotificationFiltersSchema from './read-notification-filters.schema';
import ReadNotificationRelationsSchema from './read-notification-relations.schema';
import ReadNotificationOrdersSchema from './read-notification-orders.schema';
const ReadNotificationSchema = v.optional(v.object({
filters: v.optional(ReadNotificationFiltersSchema),
relations: v.optional(ReadNotificationRelationsSchema),
orders: v.optional(ReadNotificationOrdersSchema),
pagination: v.optional(ReadPaginationSchema),
}));
export default ReadNotificationSchema;
export type TReadNotificationSchemaInput = v.InferInput<typeof ReadNotificationSchema>;
export type TReadNotificationSchemaOutput = v.InferOutput<typeof ReadNotificationSchema>;
