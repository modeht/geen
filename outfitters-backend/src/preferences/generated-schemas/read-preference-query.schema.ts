import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadPreferenceFiltersSchema } from './read-preference-filters.schema';
import { ReadPreferenceRelationsSchema } from './read-preference-relations.schema';
import { ReadPreferenceOrdersSchema } from './read-preference-orders.schema';
const ReadPreferenceSchema = v.optional(v.object({
filters: v.undefinedable(ReadPreferenceFiltersSchema),
relations: v.undefinedable(ReadPreferenceRelationsSchema),
orders: v.undefinedable(ReadPreferenceOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadPreferenceSchema;
export type TReadPreferenceSchemaInput = v.InferInput<typeof ReadPreferenceSchema>;
export type TReadPreferenceSchemaOutput = v.InferOutput<typeof ReadPreferenceSchema>;
