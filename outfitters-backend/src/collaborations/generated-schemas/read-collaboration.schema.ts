import * as v from 'valibot';
import { ReadCollaborationFiltersSchema } from './read-collaboration-filters.schema';
import { ReadCollaborationRelationsSchema } from './read-collaboration-relations.schema';
export const ReadCollaborationSchema = v.object({
filters: ReadCollaborationFiltersSchema,
relations: ReadCollaborationRelationsSchema,
});
export type TReadCollaborationSchemaInput = v.InferInput<typeof ReadCollaborationSchema>;
export type TReadCollaborationSchemaOutput = v.InferOutput<typeof ReadCollaborationSchema>;
