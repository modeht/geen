import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserFiltersSchema, ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'
import { ReadStoryFiltersSchema, ReadStoryFiltersSchemaFilters } from './read-story-filters.schema'

export class ReadStoryLikesFiltersSchemaFilters {user?: ReadUserFiltersSchemaFilters | null | undefined;
story?: ReadStoryFiltersSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined;
storyId?: GenericComparable<"number"> | null | undefined}

export const ReadStoryLikesFiltersSchema: v.GenericSchema<ReadStoryLikesFiltersSchemaFilters> = v.object({user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
story: v.nullish(v.lazy(() => ReadStoryFiltersSchema)),
userId: v.nullish(comparable("number")),
storyId: v.nullish(comparable("number"))})



export type TReadStoryLikesFiltersSchemaOutput = v.InferOutput<typeof ReadStoryLikesFiltersSchema>;
export type TReadStoryLikesFiltersSchemaInput = v.InferInput<typeof ReadStoryLikesFiltersSchema>;
