import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelationsSchemaRelations } from './read-story-relations.schema'

export class ReadStoryLikesRelationsSchemaRelations {user?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
story?: ReadStoryRelationsSchemaRelations | boolean | null | undefined}

export const ReadStoryLikesRelationsSchema: v.GenericSchema<ReadStoryLikesRelationsSchemaRelations> = v.object({user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
story: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)]))})



export type TReadStoryLikesRelationsSchema = v.InferOutput<typeof ReadStoryLikesRelationsSchema>;

export type TReadStoryLikesRelationsSchemaInput = v.InferInput<typeof ReadStoryLikesRelationsSchema>;
