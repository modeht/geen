import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadUserInterestFiltersSchema from './read-user-interest-filters.schema';
import ReadUserInterestRelationsSchema from './read-user-interest-relations.schema';
import ReadUserInterestOrdersSchema from './read-user-interest-orders.schema';
const ReadUserInterestSchema = v.optional(
	v.object({
		filters: v.optional(ReadUserInterestFiltersSchema),
		relations: v.optional(ReadUserInterestRelationsSchema),
		orders: v.optional(ReadUserInterestOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadUserInterestSchema;
export type TReadUserInterestSchemaInput = v.InferInput<typeof ReadUserInterestSchema>;
export type TReadUserInterestSchemaOutput = v.InferOutput<typeof ReadUserInterestSchema>;
