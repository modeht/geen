import * as v from 'valibot';
import { ReadNotificationFiltersSchema } from './read-notification-filters.schema';
import { ReadNotificationRelationsSchema } from './read-notification-relations.schema';
export const ReadNotificationSchema = v.object({
filters: v.nullish(ReadNotificationFiltersSchema),
relations: v.nullish(ReadNotificationRelationsSchema),
});
export type TReadNotificationSchemaInput = v.InferInput<typeof ReadNotificationSchema>;
export type TReadNotificationSchemaOutput = v.InferOutput<typeof ReadNotificationSchema>;
