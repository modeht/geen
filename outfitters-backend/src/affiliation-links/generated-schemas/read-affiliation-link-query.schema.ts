import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadAffiliationLinkFiltersSchema from './read-affiliation-link-filters.schema';
import ReadAffiliationLinkRelationsSchema from './read-affiliation-link-relations.schema';
import ReadAffiliationLinkOrdersSchema from './read-affiliation-link-orders.schema';
const ReadAffiliationLinkSchema = v.optional(v.object({
filters: v.optional(ReadAffiliationLinkFiltersSchema),
relations: v.optional(ReadAffiliationLinkRelationsSchema),
orders: v.optional(ReadAffiliationLinkOrdersSchema),
pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
}));
export default ReadAffiliationLinkSchema;
export type TReadAffiliationLinkSchemaInput = v.InferInput<typeof ReadAffiliationLinkSchema>;
export type TReadAffiliationLinkSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkSchema>;
