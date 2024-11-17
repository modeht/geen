import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { searchMode } from '../entities/recent-searches.entity';
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'

export class ReadRecentSearchesSchemaFilters {keyword?: GenericComparable<"string"> | null | undefined;
user?: ReadUserSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined}

export const ReadRecentSearchesSchema: v.GenericSchema<ReadRecentSearchesSchemaFilters> = v.object({keyword: v.nullish(comparable("string")),
user: v.nullish(v.lazy(() => ReadUserSchema)),
userId: v.nullish(comparable("number"))})



export type TReadRecentSearchesSchema = v.InferOutput<typeof ReadRecentSearchesSchema>
export type TReadRecentSearchesSchemaInput = v.InferInput<typeof ReadRecentSearchesSchema>
