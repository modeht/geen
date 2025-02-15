import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';

export class ReadUsersFiltersSchemaFilters {
	name?: GenericComparable<'string'> | null;
}

const ReadUsersFiltersSchema: v.GenericSchema<ReadUsersFiltersSchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	test: v.union([v.string(), v.null(), v.number()]),
});

export default ReadUsersFiltersSchema;

export type TReadUsersFiltersSchemaOutput = v.InferOutput<typeof ReadUsersFiltersSchema>;
export type TReadUsersFiltersSchemaInput = v.InferInput<typeof ReadUsersFiltersSchema>;
