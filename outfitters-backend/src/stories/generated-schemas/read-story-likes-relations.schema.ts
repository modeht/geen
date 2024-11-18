import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelations } from './read-story-relations.schema'



export class ReadStoryLikesRelations {user?: ReadUserRelations | boolean | null | undefined;
story?: ReadStoryRelations | boolean | null | undefined}

export const ReadStoryLikesRelationsSchema: v.GenericSchema<ReadStoryLikesRelations> = v.object({user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
story: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)]))})



export type TReadStoryLikesRelationsSchemaOutput = v.InferOutput<typeof ReadStoryLikesRelationsSchema>;
export type TReadStoryLikesRelationsSchemaInput = v.InferInput<typeof ReadStoryLikesRelationsSchema>;
