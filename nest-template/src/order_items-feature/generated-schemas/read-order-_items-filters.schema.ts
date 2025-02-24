import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadOrdersFiltersSchema, {
	ReadOrdersFiltersSchemaFilters,
} from '../../orders-feature/generated-schemas/read-orders-filters.schema';
import ReadProductsFiltersSchema, {
	ReadProductsFiltersSchemaFilters,
} from '../../products-feature/generated-schemas/read-products-filters.schema';

export class ReadOrder_itemsFiltersSchemaFilters {
	order_id?: ReadOrdersFiltersSchemaFilters | null;
	product_id?: ReadProductsFiltersSchemaFilters | null;
	quantity?: GenericComparable<'number'> | null;
	price_at_purchase?: GenericComparable<'number'> | null;
}

const ReadOrder_itemsFiltersSchema: v.GenericSchema<ReadOrder_itemsFiltersSchemaFilters> = v.object({
	order_id: v.nullish(v.lazy(() => ReadOrdersFiltersSchema)),
	product_id: v.nullish(v.lazy(() => ReadProductsFiltersSchema)),
	quantity: v.nullish(comparable('number')),
	price_at_purchase: v.nullish(comparable('number')),
});

export default ReadOrder_itemsFiltersSchema;

export type TReadOrder_itemsFiltersSchemaOutput = v.InferOutput<typeof ReadOrder_itemsFiltersSchema>;
export type TReadOrder_itemsFiltersSchemaInput = v.InferInput<typeof ReadOrder_itemsFiltersSchema>;
