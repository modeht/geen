import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersFiltersSchema, {
	ReadUsersFiltersSchemaFilters,
} from '../../users-feature/generated-schemas/read-users-filters.schema';
import ReadOrder_itemsFiltersSchema, {
	ReadOrder_itemsFiltersSchemaFilters,
} from '../../order_items-feature/generated-schemas/read-order-_items-filters.schema';

export class ReadOrdersFiltersSchemaFilters {
	user_id?: GenericComparable<'number'> | null;
	order_user?: ReadUsersFiltersSchemaFilters | null;
	total_amount?: GenericComparable<'number'> | null;
	order_status?: GenericComparable<'string'> | null;
	order_order_items?: ReadOrder_itemsFiltersSchemaFilters | null;
}

const ReadOrdersFiltersSchema: v.GenericSchema<ReadOrdersFiltersSchemaFilters> = v.object({
	user_id: v.nullish(comparable('number')),
	order_user: v.nullish(v.lazy(() => ReadUsersFiltersSchema)),
	total_amount: v.nullish(comparable('number')),
	order_status: v.nullish(comparable('string')),
	order_order_items: v.nullish(v.lazy(() => ReadOrder_itemsFiltersSchema)),
});

export default ReadOrdersFiltersSchema;

export type TReadOrdersFiltersSchemaOutput = v.InferOutput<typeof ReadOrdersFiltersSchema>;
export type TReadOrdersFiltersSchemaInput = v.InferInput<typeof ReadOrdersFiltersSchema>;
