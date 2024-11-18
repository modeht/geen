import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadSavedCollectionRelationsSchema, ReadSavedCollectionRelationsSchemaRelations } from './read-saved-collection-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelationsSchemaRelations } from '../../posts/generated-schemas/read-post-relations.schema'

export class ReadSavedCollectionItemRelationsSchemaRelations {savedCollection?: ReadSavedCollectionRelationsSchemaRelations | boolean | null | undefined;
product?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
post?: ReadPostRelationsSchemaRelations | boolean | null | undefined}

export const ReadSavedCollectionItemRelationsSchema: v.GenericSchema<ReadSavedCollectionItemRelationsSchemaRelations> = v.object({savedCollection: v.nullish(v.union([v.boolean(), v.lazy(() => ReadSavedCollectionRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)]))})



export type TReadSavedCollectionItemRelationsSchema = v.InferOutput<typeof ReadSavedCollectionItemRelationsSchema>;

export type TReadSavedCollectionItemRelationsSchemaInput = v.InferInput<typeof ReadSavedCollectionItemRelationsSchema>;
