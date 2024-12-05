import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadCollaborationFiltersSchema from './read-collaboration-filters.schema';
import ReadCollaborationRelationsSchema from './read-collaboration-relations.schema';
import ReadCollaborationOrdersSchema from './read-collaboration-orders.schema';
const ReadCollaborationSchema = v.optional(v.object({
filters: v.optional(ReadCollaborationFiltersSchema),
relations: v.optional(ReadCollaborationRelationsSchema),
orders: v.optional(ReadCollaborationOrdersSchema),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));
export default ReadCollaborationSchema;
export type TReadCollaborationSchemaInput = v.InferInput<typeof ReadCollaborationSchema>;
export type TReadCollaborationSchemaOutput = v.InferOutput<typeof ReadCollaborationSchema>;
