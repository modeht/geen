import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadAffiliationLinkRelationsSchema, { ReadAffiliationLinkRelations } from './read-affiliation-link-relations.schema'
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'



export class ReadAffiliationLinkTrackingRelations {affiliationLink?: ReadAffiliationLinkRelations | string | boolean | undefined;
user?: ReadUserRelations | string | boolean | undefined}

const ReadAffiliationLinkTrackingRelationsSchema: v.GenericSchema<ReadAffiliationLinkTrackingRelations> = v.object({affiliationLink: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadAffiliationLinkRelationsSchema)])),
user: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)]))});

export default ReadAffiliationLinkTrackingRelationsSchema;




export type TReadAffiliationLinkTrackingRelationsSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkTrackingRelationsSchema>;
export type TReadAffiliationLinkTrackingRelationsSchemaInput = v.InferInput<typeof ReadAffiliationLinkTrackingRelationsSchema>;
