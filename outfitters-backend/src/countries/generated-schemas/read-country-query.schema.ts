import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadCountryFiltersSchema from './read-country-filters.schema';
import ReadCountryRelationsSchema from './read-country-relations.schema';
import ReadCountryOrdersSchema from './read-country-orders.schema';
const ReadCountrySchema = v.optional(
	v.object({
		filters: v.optional(ReadCountryFiltersSchema),
		relations: v.optional(ReadCountryRelationsSchema),
		orders: v.optional(ReadCountryOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadCountrySchema;
export type TReadCountrySchemaInput = v.InferInput<typeof ReadCountrySchema>;
export type TReadCountrySchemaOutput = v.InferOutput<typeof ReadCountrySchema>;
