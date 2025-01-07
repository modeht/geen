import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadPlanFiltersSchema from './read-plan-filters.schema';
import ReadPlanRelationsSchema from './read-plan-relations.schema';
import ReadPlanOrdersSchema from './read-plan-orders.schema';
const ReadPlanSchema = v.optional(
	v.object({
		filters: v.optional(ReadPlanFiltersSchema),
		relations: v.optional(ReadPlanRelationsSchema),
		orders: v.optional(ReadPlanOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadPlanSchema;
export type TReadPlanSchemaInput = v.InferInput<typeof ReadPlanSchema>;
export type TReadPlanSchemaOutput = v.InferOutput<typeof ReadPlanSchema>;
