import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { searchMode } from '../entities/recent-searches.entity';
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'

export class ReadRecentSearchesRelationsSchemaRelations {user?: ReadUserRelationsSchemaRelations | boolean | null | undefined}

export const ReadRecentSearchesRelationsSchema: v.GenericSchema<ReadRecentSearchesRelationsSchemaRelations> = v.object({user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)]))})



export type TReadRecentSearchesRelationsSchema = v.InferOutput<typeof ReadRecentSearchesRelationsSchema>;

export type TReadRecentSearchesRelationsSchemaInput = v.InferInput<typeof ReadRecentSearchesRelationsSchema>;
