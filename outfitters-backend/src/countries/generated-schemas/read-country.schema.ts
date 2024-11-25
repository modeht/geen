import * as v from 'valibot';
import { ReadCountryFiltersSchema } from './read-country-filters.schema';
import { ReadCountryRelationsSchema } from './read-country-relations.schema';
import { ReadCountryOrdersSchema } from './read-country-orders.schema';
export const ReadCountrySchema = v.object({
filters: v.undefinedable(ReadCountryFiltersSchema),
relations: v.undefinedable(ReadCountryRelationsSchema),
orders: v.undefinedable(ReadCountryOrdersSchema),
});
export type TReadCountrySchemaInput = v.InferInput<typeof ReadCountrySchema>;
export type TReadCountrySchemaOutput = v.InferOutput<typeof ReadCountrySchema>;
