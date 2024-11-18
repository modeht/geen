import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelations } from './read-post-relations.schema'



export class ReadPostLikesRelations {user?: ReadUserRelations | boolean | null | undefined;
post?: ReadPostRelations | boolean | null | undefined}

export const ReadPostLikesRelationsSchema: v.GenericSchema<ReadPostLikesRelations> = v.object({user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)]))})



export type TReadPostLikesRelationsSchemaOutput = v.InferOutput<typeof ReadPostLikesRelationsSchema>;
export type TReadPostLikesRelationsSchemaInput = v.InferInput<typeof ReadPostLikesRelationsSchema>;
