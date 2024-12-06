import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadMediaFiltersSchema from './read-media-filters.schema';
import ReadMediaRelationsSchema from './read-media-relations.schema';
import ReadMediaOrdersSchema from './read-media-orders.schema';
const ReadMediaSchema = v.optional(
	v.object({
		filters: v.optional(ReadMediaFiltersSchema),
		relations: v.optional(ReadMediaRelationsSchema),
		orders: v.optional(ReadMediaOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadMediaSchema;
export type TReadMediaSchemaInput = v.InferInput<typeof ReadMediaSchema>;
export type TReadMediaSchemaOutput = v.InferOutput<typeof ReadMediaSchema>;
