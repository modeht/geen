import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import ReadStoryRelationsSchema, { ReadStoryRelations } from './read-story-relations.schema'



export class ReadStoryLikesRelations {user?: ReadUserRelations | string | boolean;
story?: ReadStoryRelations | string | boolean}

const ReadStoryLikesRelationsSchema: v.GenericSchema<ReadStoryLikesRelations> = v.object({user: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
story: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryRelationsSchema)]))});

export default ReadStoryLikesRelationsSchema;




export type TReadStoryLikesRelationsSchemaOutput = v.InferOutput<typeof ReadStoryLikesRelationsSchema>;
export type TReadStoryLikesRelationsSchemaInput = v.InferInput<typeof ReadStoryLikesRelationsSchema>;
