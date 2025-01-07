import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadStaticFiltersSchema from './read-static-filters.schema';
import ReadStaticRelationsSchema from './read-static-relations.schema';
import ReadStaticOrdersSchema from './read-static-orders.schema';
const ReadStaticSchema = v.optional(
	v.object({
		filters: v.optional(ReadStaticFiltersSchema),
		relations: v.optional(ReadStaticRelationsSchema),
		orders: v.optional(ReadStaticOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadStaticSchema;
export type TReadStaticSchemaInput = v.InferInput<typeof ReadStaticSchema>;
export type TReadStaticSchemaOutput = v.InferOutput<typeof ReadStaticSchema>;
