import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadAffiliationLinkSchema, ReadAffiliationLinkSchemaFilters } from './read-affiliation-link.schema'
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'

export class ReadAffiliationLinkTrackingSchemaFilters {affiliationLink?: ReadAffiliationLinkSchemaFilters | null | undefined;
user?: ReadUserSchemaFilters | null | undefined;
referrer?: GenericComparable<"string"> | null | undefined;
country?: GenericComparable<"string"> | null | undefined;
ipAddress?: GenericComparable<"string"> | null | undefined;
userAgent?: GenericComparable<"string"> | null | undefined}

export const ReadAffiliationLinkTrackingSchema: v.GenericSchema<ReadAffiliationLinkTrackingSchemaFilters> = v.object({affiliationLink: v.nullish(v.lazy(() => ReadAffiliationLinkSchema)),
user: v.nullish(v.lazy(() => ReadUserSchema)),
referrer: v.nullish(comparable("string")),
country: v.nullish(comparable("string")),
ipAddress: v.nullish(comparable("string")),
userAgent: v.nullish(comparable("string"))})



export type TReadAffiliationLinkTrackingSchema = v.InferOutput<typeof ReadAffiliationLinkTrackingSchema>
export type TReadAffiliationLinkTrackingSchemaInput = v.InferInput<typeof ReadAffiliationLinkTrackingSchema>
