import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'
import { ReadStorySchema, ReadStorySchemaFilters } from './read-story.schema'

export class ReadStoryLikesSchemaFilters {user?: ReadUserSchemaFilters | null | undefined;
story?: ReadStorySchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined;
storyId?: GenericComparable<"number"> | null | undefined}

export const ReadStoryLikesSchema: v.GenericSchema<ReadStoryLikesSchemaFilters> = v.object({user: v.nullish(v.lazy(() => ReadUserSchema)),
story: v.nullish(v.lazy(() => ReadStorySchema)),
userId: v.nullish(comparable("number")),
storyId: v.nullish(comparable("number"))})



export type TReadStoryLikesSchema = v.InferOutput<typeof ReadStoryLikesSchema>
export type TReadStoryLikesSchemaInput = v.InferInput<typeof ReadStoryLikesSchema>
