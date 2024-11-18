import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadAffiliationLinkFiltersSchema, ReadAffiliationLinkFiltersSchemaFilters } from './read-affiliation-link-filters.schema'
import { ReadUserFiltersSchema, ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'



export class ReadAffiliationLinkTrackingFiltersSchemaFilters {affiliationLink?: ReadAffiliationLinkFiltersSchemaFilters | null | undefined;
user?: ReadUserFiltersSchemaFilters | null | undefined;
referrer?: GenericComparable<"string"> | null | undefined;
country?: GenericComparable<"string"> | null | undefined;
ipAddress?: GenericComparable<"string"> | null | undefined;
userAgent?: GenericComparable<"string"> | null | undefined}

export const ReadAffiliationLinkTrackingFiltersSchema: v.GenericSchema<ReadAffiliationLinkTrackingFiltersSchemaFilters> = v.object({affiliationLink: v.nullish(v.lazy(() => ReadAffiliationLinkFiltersSchema)),
user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
referrer: v.nullish(comparable("string")),
country: v.nullish(comparable("string")),
ipAddress: v.nullish(comparable("string")),
userAgent: v.nullish(comparable("string"))})



export type TReadAffiliationLinkTrackingFiltersSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkTrackingFiltersSchema>;
export type TReadAffiliationLinkTrackingFiltersSchemaInput = v.InferInput<typeof ReadAffiliationLinkTrackingFiltersSchema>;
