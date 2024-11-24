import * as v from 'valibot';
import { ReadAffiliationLinkFiltersSchema } from './read-affiliation-link-filters.schema';
import { ReadAffiliationLinkRelationsSchema } from './read-affiliation-link-relations.schema';
export const ReadAffiliationLinkSchema = v.object({
	filters: v.nullish(ReadAffiliationLinkFiltersSchema),
	relations: v.nullish(ReadAffiliationLinkRelationsSchema),
});
export type TReadAffiliationLinkSchemaInput = v.InferInput<
	typeof ReadAffiliationLinkSchema
>;
export type TReadAffiliationLinkSchemaOutput = v.InferOutput<
	typeof ReadAffiliationLinkSchema
>;
