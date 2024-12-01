import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadSavedCollectionRelationsSchema, { ReadSavedCollectionRelations } from './read-saved-collection-relations.schema'
import ReadProductRelationsSchema, { ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import ReadPostRelationsSchema, { ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'



export class ReadSavedCollectionItemRelations {savedCollection?: ReadSavedCollectionRelations | string | boolean;
product?: ReadProductRelations | string | boolean;
post?: ReadPostRelations | string | boolean}

const ReadSavedCollectionItemRelationsSchema: v.GenericSchema<ReadSavedCollectionItemRelations> = v.object({savedCollection: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadSavedCollectionRelationsSchema)])),
product: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)])),
post: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)]))});

export default ReadSavedCollectionItemRelationsSchema;




export type TReadSavedCollectionItemRelationsSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemRelationsSchema>;
export type TReadSavedCollectionItemRelationsSchemaInput = v.InferInput<typeof ReadSavedCollectionItemRelationsSchema>;
