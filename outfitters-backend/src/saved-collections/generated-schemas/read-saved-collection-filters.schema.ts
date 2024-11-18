import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadSavedCollectionItemFiltersSchema, ReadSavedCollectionItemFiltersSchemaFilters } from './read-saved-collection-item-filters.schema'
import { ReadUserFiltersSchema, ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'

export class ReadSavedCollectionFiltersSchemaFilters {name?: GenericComparable<"string"> | null | undefined;
items?: ReadSavedCollectionItemFiltersSchemaFilters | null | undefined;
user?: ReadUserFiltersSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined}

export const ReadSavedCollectionFiltersSchema: v.GenericSchema<ReadSavedCollectionFiltersSchemaFilters> = v.object({name: v.nullish(comparable("string")),
items: v.nullish(v.lazy(() => ReadSavedCollectionItemFiltersSchema)),
user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
userId: v.nullish(comparable("number"))})



export type TReadSavedCollectionSchemaOutput = v.InferOutput<typeof ReadSavedCollectionFiltersSchema>;
export type TReadSavedCollectionSchemaInput = v.InferInput<typeof ReadSavedCollectionFiltersSchema>;
