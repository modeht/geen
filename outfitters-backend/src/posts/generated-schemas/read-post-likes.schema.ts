import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'
import { ReadPostSchema, ReadPostSchemaFilters } from './read-post.schema'

export class ReadPostLikesSchemaFilters {user?: ReadUserSchemaFilters | null | undefined;
post?: ReadPostSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined;
postId?: GenericComparable<"number"> | null | undefined}

export const ReadPostLikesSchema: v.GenericSchema<ReadPostLikesSchemaFilters> = v.object({user: v.nullish(v.lazy(() => ReadUserSchema)),
post: v.nullish(v.lazy(() => ReadPostSchema)),
userId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number"))})



export type TReadPostLikesSchema = v.InferOutput<typeof ReadPostLikesSchema>
export type TReadPostLikesSchemaInput = v.InferInput<typeof ReadPostLikesSchema>
