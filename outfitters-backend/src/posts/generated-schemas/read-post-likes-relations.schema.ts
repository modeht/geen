import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import ReadPostRelationsSchema, { ReadPostRelations } from './read-post-relations.schema'



export class ReadPostLikesRelations {user?: ReadUserRelations | string | boolean | undefined;
post?: ReadPostRelations | string | boolean | undefined}

const ReadPostLikesRelationsSchema: v.GenericSchema<ReadPostLikesRelations> = v.object({user: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
post: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)]))});

export default ReadPostLikesRelationsSchema;




export type TReadPostLikesRelationsSchemaOutput = v.InferOutput<typeof ReadPostLikesRelationsSchema>;
export type TReadPostLikesRelationsSchemaInput = v.InferInput<typeof ReadPostLikesRelationsSchema>;
