import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadSavedCollectionItemRelationsSchema, ReadSavedCollectionItemRelationsSchemaRelations } from './read-saved-collection-item-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'

export class ReadSavedCollectionRelationsSchemaRelations {items?: ReadSavedCollectionItemRelationsSchemaRelations | boolean | null | undefined;
user?: ReadUserRelationsSchemaRelations | boolean | null | undefined}

export const ReadSavedCollectionRelationsSchema: v.GenericSchema<ReadSavedCollectionRelationsSchemaRelations> = v.object({items: v.nullish(v.union([v.boolean(), v.lazy(() => ReadSavedCollectionItemRelationsSchema)])),
user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)]))})



export type TReadSavedCollectionRelationsSchema = v.InferOutput<typeof ReadSavedCollectionRelationsSchema>;

export type TReadSavedCollectionRelationsSchemaInput = v.InferInput<typeof ReadSavedCollectionRelationsSchema>;
