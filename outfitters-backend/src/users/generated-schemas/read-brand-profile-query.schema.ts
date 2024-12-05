import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadBrandProfileFiltersSchema from './read-brand-profile-filters.schema';
import ReadBrandProfileRelationsSchema from './read-brand-profile-relations.schema';
import ReadBrandProfileOrdersSchema from './read-brand-profile-orders.schema';
const ReadBrandProfileSchema = v.optional(v.object({
filters: v.optional(ReadBrandProfileFiltersSchema),
relations: v.optional(ReadBrandProfileRelationsSchema),
orders: v.optional(ReadBrandProfileOrdersSchema),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));
export default ReadBrandProfileSchema;
export type TReadBrandProfileSchemaInput = v.InferInput<typeof ReadBrandProfileSchema>;
export type TReadBrandProfileSchemaOutput = v.InferOutput<typeof ReadBrandProfileSchema>;
