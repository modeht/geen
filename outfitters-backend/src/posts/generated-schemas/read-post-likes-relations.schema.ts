import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelationsSchemaRelations } from './read-post-relations.schema'

export class ReadPostLikesRelationsSchemaRelations {user?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
post?: ReadPostRelationsSchemaRelations | boolean | null | undefined}

export const ReadPostLikesRelationsSchema: v.GenericSchema<ReadPostLikesRelationsSchemaRelations> = v.object({user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)]))})



export type TReadPostLikesRelationsSchemaOutput = v.InferOutput<typeof ReadPostLikesRelationsSchema>;
export type TReadPostLikesRelationsSchemaInput = v.InferInput<typeof ReadPostLikesRelationsSchema>;
