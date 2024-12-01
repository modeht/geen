import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadSavedCollectionItemRelationsSchema, { ReadSavedCollectionItemRelations } from './read-saved-collection-item-relations.schema'
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'



export class ReadSavedCollectionRelations {items?: ReadSavedCollectionItemRelations | string | boolean;
user?: ReadUserRelations | string | boolean}

const ReadSavedCollectionRelationsSchema: v.GenericSchema<ReadSavedCollectionRelations> = v.object({items: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadSavedCollectionItemRelationsSchema)])),
user: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)]))});

export default ReadSavedCollectionRelationsSchema;




export type TReadSavedCollectionRelationsSchemaOutput = v.InferOutput<typeof ReadSavedCollectionRelationsSchema>;
export type TReadSavedCollectionRelationsSchemaInput = v.InferInput<typeof ReadSavedCollectionRelationsSchema>;
