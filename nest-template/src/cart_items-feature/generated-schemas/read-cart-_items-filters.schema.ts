import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersFiltersSchema, {
	ReadUsersFiltersSchemaFilters,
} from '../../users-feature/generated-schemas/read-users-filters.schema';
import ReadProductsFiltersSchema, {
	ReadProductsFiltersSchemaFilters,
} from '../../products-feature/generated-schemas/read-products-filters.schema';

export class ReadCart_itemsFiltersSchemaFilters {
	user_id?: GenericComparable<'number'> | null;
	cart_item_user?: ReadUsersFiltersSchemaFilters | null;
	product_id?: GenericComparable<'number'> | null;
	cart_item_product?: ReadProductsFiltersSchemaFilters | null;
	quantity?: GenericComparable<'number'> | null;
	added_at?: GenericComparable<'date'> | null;
}

const ReadCart_itemsFiltersSchema: v.GenericSchema<ReadCart_itemsFiltersSchemaFilters> = v.object({
	user_id: v.nullish(comparable('number')),
	cart_item_user: v.nullish(v.lazy(() => ReadUsersFiltersSchema)),
	product_id: v.nullish(comparable('number')),
	cart_item_product: v.nullish(v.lazy(() => ReadProductsFiltersSchema)),
	quantity: v.nullish(comparable('number')),
	added_at: v.nullish(comparable('date')),
});

export default ReadCart_itemsFiltersSchema;

export type TReadCart_itemsFiltersSchemaOutput = v.InferOutput<typeof ReadCart_itemsFiltersSchema>;
export type TReadCart_itemsFiltersSchemaInput = v.InferInput<typeof ReadCart_itemsFiltersSchema>;
