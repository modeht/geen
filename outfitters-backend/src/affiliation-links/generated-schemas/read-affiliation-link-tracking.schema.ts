import * as v from 'valibot';
import { ReadAffiliationLinkTrackingFiltersSchema } from './read-affiliation-link-tracking-filters.schema';
import { ReadAffiliationLinkTrackingRelationsSchema } from './read-affiliation-link-tracking-relations.schema';
import { ReadAffiliationLinkTrackingOrdersSchema } from './read-affiliation-link-tracking-orders.schema';
export const ReadAffiliationLinkTrackingSchema = v.object({
filters: v.undefinedable(ReadAffiliationLinkTrackingFiltersSchema),
relations: v.undefinedable(ReadAffiliationLinkTrackingRelationsSchema),
orders: v.undefinedable(ReadAffiliationLinkTrackingOrdersSchema),
});
export type TReadAffiliationLinkTrackingSchemaInput = v.InferInput<typeof ReadAffiliationLinkTrackingSchema>;
export type TReadAffiliationLinkTrackingSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkTrackingSchema>;
