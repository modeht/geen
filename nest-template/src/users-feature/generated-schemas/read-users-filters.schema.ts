import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadProfilesFiltersSchema, {
	ReadProfilesFiltersSchemaFilters,
} from '../../profiles-feature/generated-schemas/read-profiles-filters.schema';

export class ReadUsersFiltersSchemaFilters {
	profiles?: ReadProfilesFiltersSchemaFilters | null;
}

const ReadUsersFiltersSchema: v.GenericSchema<ReadUsersFiltersSchemaFilters> = v.object({
	profiles: v.nullish(v.lazy(() => ReadProfilesFiltersSchema)),
});

export default ReadUsersFiltersSchema;

export type TReadUsersFiltersSchemaOutput = v.InferOutput<typeof ReadUsersFiltersSchema>;
export type TReadUsersFiltersSchemaInput = v.InferInput<typeof ReadUsersFiltersSchema>;
