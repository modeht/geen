import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersFiltersSchema, {
	ReadUsersFiltersSchemaFilters,
} from '../../users-feature/generated-schemas/read-users-filters.schema';

export class ReadProfilesFiltersSchemaFilters {
	user?: ReadUsersFiltersSchemaFilters | null;
}

const ReadProfilesFiltersSchema: v.GenericSchema<ReadProfilesFiltersSchemaFilters> = v.object({
	user: v.nullish(v.lazy(() => ReadUsersFiltersSchema)),
});

export default ReadProfilesFiltersSchema;

export type TReadProfilesFiltersSchemaOutput = v.InferOutput<typeof ReadProfilesFiltersSchema>;
export type TReadProfilesFiltersSchemaInput = v.InferInput<typeof ReadProfilesFiltersSchema>;
