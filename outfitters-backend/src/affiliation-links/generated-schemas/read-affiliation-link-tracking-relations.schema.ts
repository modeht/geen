import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelationsSchemaRelations } from './read-affiliation-link-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'

export class ReadAffiliationLinkTrackingRelationsSchemaRelations {affiliationLink?: ReadAffiliationLinkRelationsSchemaRelations | boolean | null | undefined;
user?: ReadUserRelationsSchemaRelations | boolean | null | undefined}

export const ReadAffiliationLinkTrackingRelationsSchema: v.GenericSchema<ReadAffiliationLinkTrackingRelationsSchemaRelations> = v.object({affiliationLink: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkRelationsSchema)])),
user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)]))})



export type TReadAffiliationLinkTrackingRelationsSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkTrackingRelationsSchema>;
export type TReadAffiliationLinkTrackingRelationsSchemaInput = v.InferInput<typeof ReadAffiliationLinkTrackingRelationsSchema>;
