import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadAffiliationLinkTrackingFiltersSchema } from './read-affiliation-link-tracking-filters.schema';
import { ReadAffiliationLinkTrackingRelationsSchema } from './read-affiliation-link-tracking-relations.schema';
import { ReadAffiliationLinkTrackingOrdersSchema } from './read-affiliation-link-tracking-orders.schema';
const ReadAffiliationLinkTrackingSchema = v.optional(v.object({
filters: v.undefinedable(ReadAffiliationLinkTrackingFiltersSchema),
relations: v.undefinedable(ReadAffiliationLinkTrackingRelationsSchema),
orders: v.undefinedable(ReadAffiliationLinkTrackingOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadAffiliationLinkTrackingSchema;
export type TReadAffiliationLinkTrackingSchemaInput = v.InferInput<typeof ReadAffiliationLinkTrackingSchema>;
export type TReadAffiliationLinkTrackingSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkTrackingSchema>;
