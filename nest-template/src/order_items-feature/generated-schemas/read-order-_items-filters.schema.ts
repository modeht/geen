import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadOrdersFiltersSchema, {
	ReadOrdersFiltersSchemaFilters,
} from '../../orders-feature/generated-schemas/read-orders-filters.schema';
import ReadProductsFiltersSchema, {
	ReadProductsFiltersSchemaFilters,
} from '../../products-feature/generated-schemas/read-products-filters.schema';

export class ReadOrder_itemsFiltersSchemaFilters {
	order_id?: GenericComparable<'number'> | null;
	order_item_order?: ReadOrdersFiltersSchemaFilters | null;
	product_id?: GenericComparable<'number'> | null;
	order_item_product?: ReadProductsFiltersSchemaFilters | null;
	quantity?: GenericComparable<'number'> | null;
	unit_price?: GenericComparable<'number'> | null;
}

const ReadOrder_itemsFiltersSchema: v.GenericSchema<ReadOrder_itemsFiltersSchemaFilters> = v.object({
	order_id: v.nullish(comparable('number')),
	order_item_order: v.nullish(v.lazy(() => ReadOrdersFiltersSchema)),
	product_id: v.nullish(comparable('number')),
	order_item_product: v.nullish(v.lazy(() => ReadProductsFiltersSchema)),
	quantity: v.nullish(comparable('number')),
	unit_price: v.nullish(comparable('number')),
});

export default ReadOrder_itemsFiltersSchema;

export type TReadOrder_itemsFiltersSchemaOutput = v.InferOutput<typeof ReadOrder_itemsFiltersSchema>;
export type TReadOrder_itemsFiltersSchemaInput = v.InferInput<typeof ReadOrder_itemsFiltersSchema>;
