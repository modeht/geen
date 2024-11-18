import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelations } from './read-affiliation-link-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'



export class ReadAffiliationLinkTrackingRelations {affiliationLink?: ReadAffiliationLinkRelations | boolean | null | undefined;
user?: ReadUserRelations | boolean | null | undefined}

export const ReadAffiliationLinkTrackingRelationsSchema: v.GenericSchema<ReadAffiliationLinkTrackingRelations> = v.object({affiliationLink: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkRelationsSchema)])),
user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)]))})



export type TReadAffiliationLinkTrackingRelationsSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkTrackingRelationsSchema>;
export type TReadAffiliationLinkTrackingRelationsSchemaInput = v.InferInput<typeof ReadAffiliationLinkTrackingRelationsSchema>;
