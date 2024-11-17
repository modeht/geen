import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadSavedCollectionSchema, ReadSavedCollectionSchemaFilters } from './read-saved-collection.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'
import { ReadPostSchema, ReadPostSchemaFilters } from '../../posts/generated-schemas/read-post.schema'

export class ReadSavedCollectionItemSchemaFilters {savedCollection?: ReadSavedCollectionSchemaFilters | null | undefined;
product?: ReadProductSchemaFilters | null | undefined;
post?: ReadPostSchemaFilters | null | undefined;
savedCollectionId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
postId?: GenericComparable<"number"> | null | undefined;
userId?: GenericComparable<"number"> | null | undefined}

export const ReadSavedCollectionItemSchema: v.GenericSchema<ReadSavedCollectionItemSchemaFilters> = v.object({savedCollection: v.nullish(v.lazy(() => ReadSavedCollectionSchema)),
product: v.nullish(v.lazy(() => ReadProductSchema)),
post: v.nullish(v.lazy(() => ReadPostSchema)),
savedCollectionId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number")),
userId: v.nullish(comparable("number"))})



export type TReadSavedCollectionItemSchema = v.InferOutput<typeof ReadSavedCollectionItemSchema>
export type TReadSavedCollectionItemSchemaInput = v.InferInput<typeof ReadSavedCollectionItemSchema>
