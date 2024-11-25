import * as v from 'valibot';
import { ReadAffiliationLinkFiltersSchema } from './read-affiliation-link-filters.schema';
import { ReadAffiliationLinkRelationsSchema } from './read-affiliation-link-relations.schema';
import { ReadAffiliationLinkOrdersSchema } from './read-affiliation-link-orders.schema';
export const ReadAffiliationLinkSchema = v.object({
filters: v.undefinedable(ReadAffiliationLinkFiltersSchema),
relations: v.undefinedable(ReadAffiliationLinkRelationsSchema),
orders: v.undefinedable(ReadAffiliationLinkOrdersSchema),
});
export type TReadAffiliationLinkSchemaInput = v.InferInput<typeof ReadAffiliationLinkSchema>;
export type TReadAffiliationLinkSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkSchema>;
