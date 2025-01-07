import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadAdFiltersSchema from './read-ad-filters.schema';
import ReadAdRelationsSchema from './read-ad-relations.schema';
import ReadAdOrdersSchema from './read-ad-orders.schema';
const ReadAdSchema = v.optional(
	v.object({
		filters: v.optional(ReadAdFiltersSchema),
		relations: v.optional(ReadAdRelationsSchema),
		orders: v.optional(ReadAdOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadAdSchema;
export type TReadAdSchemaInput = v.InferInput<typeof ReadAdSchema>;
export type TReadAdSchemaOutput = v.InferOutput<typeof ReadAdSchema>;
