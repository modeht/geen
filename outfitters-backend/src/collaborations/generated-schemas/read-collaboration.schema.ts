import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadCollaborationFiltersSchema } from './read-collaboration-filters.schema';
import { ReadCollaborationRelationsSchema } from './read-collaboration-relations.schema';
import { ReadCollaborationOrdersSchema } from './read-collaboration-orders.schema';
export const ReadCollaborationSchema = v.object({
filters: v.undefinedable(ReadCollaborationFiltersSchema),
relations: v.undefinedable(ReadCollaborationRelationsSchema),
orders: v.undefinedable(ReadCollaborationOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadCollaborationSchemaInput = v.InferInput<typeof ReadCollaborationSchema>;
export type TReadCollaborationSchemaOutput = v.InferOutput<typeof ReadCollaborationSchema>;
