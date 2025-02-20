import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadProfilesFiltersSchema from './read-profiles-filters.schema';
import ReadProfilesRelationsSchema from './read-profiles-relations.schema';
import ReadProfilesOrdersSchema from './read-profiles-orders.schema';
const ReadProfilesSchema = v.optional(
	v.object({
		filters: v.optional(ReadProfilesFiltersSchema),
		relations: v.optional(ReadProfilesRelationsSchema),
		orders: v.optional(ReadProfilesOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadProfilesSchema;
export type TReadProfilesSchemaInput = v.InferInput<typeof ReadProfilesSchema>;
export type TReadProfilesSchemaOutput = v.InferOutput<typeof ReadProfilesSchema>;
