import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadSavedCollectionItemSchema, ReadSavedCollectionItemSchemaFilters } from './read-saved-collection-item.schema'
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'

export class ReadSavedCollectionSchemaFilters {name?: GenericComparable<"string"> | null | undefined;
items?: ReadSavedCollectionItemSchemaFilters | null | undefined;
user?: ReadUserSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined}

export const ReadSavedCollectionSchema: v.GenericSchema<ReadSavedCollectionSchemaFilters> = v.object({name: v.nullish(comparable("string")),
items: v.nullish(v.lazy(() => ReadSavedCollectionItemSchema)),
user: v.nullish(v.lazy(() => ReadUserSchema)),
userId: v.nullish(comparable("number"))})



export type TReadSavedCollectionSchema = v.InferOutput<typeof ReadSavedCollectionSchema>
export type TReadSavedCollectionSchemaInput = v.InferInput<typeof ReadSavedCollectionSchema>
