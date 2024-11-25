import * as v from 'valibot';
import { ReadCollaborationFiltersSchema } from './read-collaboration-filters.schema';
import { ReadCollaborationRelationsSchema } from './read-collaboration-relations.schema';
import { ReadCollaborationOrdersSchema } from './read-collaboration-orders.schema';
export const ReadCollaborationSchema = v.object({
filters: v.undefinedable(ReadCollaborationFiltersSchema),
relations: v.undefinedable(ReadCollaborationRelationsSchema),
orders: v.undefinedable(ReadCollaborationOrdersSchema),
});
export type TReadCollaborationSchemaInput = v.InferInput<typeof ReadCollaborationSchema>;
export type TReadCollaborationSchemaOutput = v.InferOutput<typeof ReadCollaborationSchema>;
