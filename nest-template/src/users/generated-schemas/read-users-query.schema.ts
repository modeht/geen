import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadUsersFiltersSchema from './read-users-filters.schema';
import ReadUsersRelationsSchema from './read-users-relations.schema';
import ReadUsersOrdersSchema from './read-users-orders.schema';
const ReadUsersSchema = v.optional(
	v.object({
		filters: v.optional(ReadUsersFiltersSchema),
		relations: v.optional(ReadUsersRelationsSchema),
		orders: v.optional(ReadUsersOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadUsersSchema;
export type TReadUsersSchemaInput = v.InferInput<typeof ReadUsersSchema>;
export type TReadUsersSchemaOutput = v.InferOutput<typeof ReadUsersSchema>;
