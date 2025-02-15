import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';

export class ReadUsersFiltersSchemaFilters {}

const ReadUsersFiltersSchema: v.GenericSchema<ReadUsersFiltersSchemaFilters> = v.object({});

export default ReadUsersFiltersSchema;

export type TReadUsersFiltersSchemaOutput = v.InferOutput<typeof ReadUsersFiltersSchema>;
export type TReadUsersFiltersSchemaInput = v.InferInput<typeof ReadUsersFiltersSchema>;
