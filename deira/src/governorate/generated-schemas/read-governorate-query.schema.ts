import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadGovernorateFiltersSchema from './read-governorate-filters.schema';
import ReadGovernorateRelationsSchema from './read-governorate-relations.schema';
import ReadGovernorateOrdersSchema from './read-governorate-orders.schema';
const ReadGovernorateSchema = v.optional(
	v.object({
		filters: v.optional(ReadGovernorateFiltersSchema),
		relations: v.optional(ReadGovernorateRelationsSchema),
		orders: v.optional(ReadGovernorateOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadGovernorateSchema;
export type TReadGovernorateSchemaInput = v.InferInput<typeof ReadGovernorateSchema>;
export type TReadGovernorateSchemaOutput = v.InferOutput<typeof ReadGovernorateSchema>;
