import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadStoryFiltersSchema, { ReadStoryFiltersSchemaFilters } from './read-story-filters.schema';

export class ReadStoryLikesFiltersSchemaFilters {
	user?: ReadUserFiltersSchemaFilters | null;
	story?: ReadStoryFiltersSchemaFilters | null;
	userId?: GenericComparable<'number'> | null;
	storyId?: GenericComparable<'number'> | null;
}

const ReadStoryLikesFiltersSchema: v.GenericSchema<ReadStoryLikesFiltersSchemaFilters> = v.object({
	user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	story: v.nullish(v.lazy(() => ReadStoryFiltersSchema)),
	userId: v.nullish(comparable('number')),
	storyId: v.nullish(comparable('number')),
});

export default ReadStoryLikesFiltersSchema;

export type TReadStoryLikesFiltersSchemaOutput = v.InferOutput<typeof ReadStoryLikesFiltersSchema>;
export type TReadStoryLikesFiltersSchemaInput = v.InferInput<typeof ReadStoryLikesFiltersSchema>;
