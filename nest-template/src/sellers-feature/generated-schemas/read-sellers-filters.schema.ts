import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersFiltersSchema, {
	ReadUsersFiltersSchemaFilters,
} from '../../users-feature/generated-schemas/read-users-filters.schema';

export class ReadSellersFiltersSchemaFilters {
	user_id?: ReadUsersFiltersSchemaFilters | null;
	store_name?: GenericComparable<'string'> | null;
}

const ReadSellersFiltersSchema: v.GenericSchema<ReadSellersFiltersSchemaFilters> = v.object({
	user_id: v.nullish(v.lazy(() => ReadUsersFiltersSchema)),
	store_name: v.nullish(comparable('string')),
});

export default ReadSellersFiltersSchema;

export type TReadSellersFiltersSchemaOutput = v.InferOutput<typeof ReadSellersFiltersSchema>;
export type TReadSellersFiltersSchemaInput = v.InferInput<typeof ReadSellersFiltersSchema>;
