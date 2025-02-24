import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersFiltersSchema, {
	ReadUsersFiltersSchemaFilters,
} from '../../users-feature/generated-schemas/read-users-filters.schema';

export class ReadOrdersFiltersSchemaFilters {
	user_id?: ReadUsersFiltersSchemaFilters | null;
	total_amount?: GenericComparable<'number'> | null;
	placed_at?: GenericComparable<'date'> | null;
}

const ReadOrdersFiltersSchema: v.GenericSchema<ReadOrdersFiltersSchemaFilters> = v.object({
	user_id: v.nullish(v.lazy(() => ReadUsersFiltersSchema)),
	total_amount: v.nullish(comparable('number')),
	placed_at: v.nullish(comparable('date')),
});

export default ReadOrdersFiltersSchema;

export type TReadOrdersFiltersSchemaOutput = v.InferOutput<typeof ReadOrdersFiltersSchema>;
export type TReadOrdersFiltersSchemaInput = v.InferInput<typeof ReadOrdersFiltersSchema>;
