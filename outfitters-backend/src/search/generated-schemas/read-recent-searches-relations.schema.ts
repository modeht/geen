import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { searchMode } from '../entities/recent-searches.entity';
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'



export class ReadRecentSearchesRelations {mode?: searchMode | null | undefined;
user?: ReadUserRelations | boolean | null | undefined}

export const ReadRecentSearchesRelationsSchema: v.GenericSchema<ReadRecentSearchesRelations> = v.object({mode: v.nullish(v.enum(searchMode)),
user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)]))})



export type TReadRecentSearchesRelationsSchemaOutput = v.InferOutput<typeof ReadRecentSearchesRelationsSchema>;
export type TReadRecentSearchesRelationsSchemaInput = v.InferInput<typeof ReadRecentSearchesRelationsSchema>;
