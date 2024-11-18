import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { searchMode } from '../entities/recent-searches.entity';
import { ReadUserFiltersSchema, ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'

export class ReadRecentSearchesFiltersSchemaFilters {keyword?: GenericComparable<"string"> | null | undefined;
user?: ReadUserFiltersSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined}

export const ReadRecentSearchesFiltersSchema: v.GenericSchema<ReadRecentSearchesFiltersSchemaFilters> = v.object({keyword: v.nullish(comparable("string")),
user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
userId: v.nullish(comparable("number"))})



export type TReadRecentSearchesSchemaOutput = v.InferOutput<typeof ReadRecentSearchesFiltersSchema>;
export type TReadRecentSearchesSchemaInput = v.InferInput<typeof ReadRecentSearchesFiltersSchema>;
