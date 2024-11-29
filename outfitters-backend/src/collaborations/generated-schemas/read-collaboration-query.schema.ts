import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadCollaborationFiltersSchema from './read-collaboration-filters.schema';
import ReadCollaborationRelationsSchema from './read-collaboration-relations.schema';
import ReadCollaborationOrdersSchema from './read-collaboration-orders.schema';
const ReadCollaborationSchema = v.optional(v.object({
filters: v.undefinedable(ReadCollaborationFiltersSchema),
relations: v.undefinedable(ReadCollaborationRelationsSchema),
orders: v.undefinedable(ReadCollaborationOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadCollaborationSchema;
export type TReadCollaborationSchemaInput = v.InferInput<typeof ReadCollaborationSchema>;
export type TReadCollaborationSchemaOutput = v.InferOutput<typeof ReadCollaborationSchema>;
