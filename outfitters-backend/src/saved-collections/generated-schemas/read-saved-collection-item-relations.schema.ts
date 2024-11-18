import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadSavedCollectionRelationsSchema, ReadSavedCollectionRelations } from './read-saved-collection-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'



export class ReadSavedCollectionItemRelations {savedCollection?: ReadSavedCollectionRelations | boolean | null | undefined;
product?: ReadProductRelations | boolean | null | undefined;
post?: ReadPostRelations | boolean | null | undefined}

export const ReadSavedCollectionItemRelationsSchema: v.GenericSchema<ReadSavedCollectionItemRelations> = v.object({savedCollection: v.nullish(v.union([v.boolean(), v.lazy(() => ReadSavedCollectionRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)]))})



export type TReadSavedCollectionItemRelationsSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemRelationsSchema>;
export type TReadSavedCollectionItemRelationsSchemaInput = v.InferInput<typeof ReadSavedCollectionItemRelationsSchema>;
