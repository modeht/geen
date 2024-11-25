import * as v from 'valibot';
import { ReadCountryFiltersSchema } from './read-country-filters.schema';
import { ReadCountryRelationsSchema } from './read-country-relations.schema';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';
export const ReadCountrySchema = v.object({
	filters: v.nullish(ReadCountryFiltersSchema),
	relations: v.nullish(ReadCountryRelationsSchema),
	pagination: ReadPaginationSchema,
	orders: v.union([v.literal('asc'), v.literal('desc')]),
});
export type TReadCountrySchemaInput = v.InferInput<typeof ReadCountrySchema>;
export type TReadCountrySchemaOutput = v.InferOutput<typeof ReadCountrySchema>;
