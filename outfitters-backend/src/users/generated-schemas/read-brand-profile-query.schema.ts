import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadBrandProfileFiltersSchema } from './read-brand-profile-filters.schema';
import { ReadBrandProfileRelationsSchema } from './read-brand-profile-relations.schema';
import { ReadBrandProfileOrdersSchema } from './read-brand-profile-orders.schema';
const ReadBrandProfileSchema = v.optional(v.object({
filters: v.undefinedable(ReadBrandProfileFiltersSchema),
relations: v.undefinedable(ReadBrandProfileRelationsSchema),
orders: v.undefinedable(ReadBrandProfileOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadBrandProfileSchema;
export type TReadBrandProfileSchemaInput = v.InferInput<typeof ReadBrandProfileSchema>;
export type TReadBrandProfileSchemaOutput = v.InferOutput<typeof ReadBrandProfileSchema>;
