import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserFiltersSchema, ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'
import { ReadPostFiltersSchema, ReadPostFiltersSchemaFilters } from './read-post-filters.schema'



export class ReadPostLikesFiltersSchemaFilters {user?: ReadUserFiltersSchemaFilters | null | undefined;
post?: ReadPostFiltersSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined;
postId?: GenericComparable<"number"> | null | undefined}

export const ReadPostLikesFiltersSchema: v.GenericSchema<ReadPostLikesFiltersSchemaFilters> = v.object({user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
post: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
userId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number"))})



export type TReadPostLikesFiltersSchemaOutput = v.InferOutput<typeof ReadPostLikesFiltersSchema>;
export type TReadPostLikesFiltersSchemaInput = v.InferInput<typeof ReadPostLikesFiltersSchema>;
