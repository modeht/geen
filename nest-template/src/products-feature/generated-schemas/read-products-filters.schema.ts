import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersFiltersSchema, {
	ReadUsersFiltersSchemaFilters,
} from '../../users-feature/generated-schemas/read-users-filters.schema';
import ReadOrder_itemsFiltersSchema, {
	ReadOrder_itemsFiltersSchemaFilters,
} from '../../order_items-feature/generated-schemas/read-order-_items-filters.schema';
import ReadReviewsFiltersSchema, {
	ReadReviewsFiltersSchemaFilters,
} from '../../reviews-feature/generated-schemas/read-reviews-filters.schema';
import ReadCart_itemsFiltersSchema, {
	ReadCart_itemsFiltersSchemaFilters,
} from '../../cart_items-feature/generated-schemas/read-cart-_items-filters.schema';

export class ReadProductsFiltersSchemaFilters {
	seller_id?: GenericComparable<'number'> | null;
	product_seller?: ReadUsersFiltersSchemaFilters | null;
	name?: GenericComparable<'string'> | null;
	description?: GenericComparable<'string'> | null;
	price?: GenericComparable<'number'> | null;
	stock?: GenericComparable<'number'> | null;
	product_order_items?: ReadOrder_itemsFiltersSchemaFilters | null;
	product_reviews?: ReadReviewsFiltersSchemaFilters | null;
	product_cart_items?: ReadCart_itemsFiltersSchemaFilters | null;
}

const ReadProductsFiltersSchema: v.GenericSchema<ReadProductsFiltersSchemaFilters> = v.object({
	seller_id: v.nullish(comparable('number')),
	product_seller: v.nullish(v.lazy(() => ReadUsersFiltersSchema)),
	name: v.nullish(comparable('string')),
	description: v.nullish(comparable('string')),
	price: v.nullish(comparable('number')),
	stock: v.nullish(comparable('number')),
	product_order_items: v.nullish(v.lazy(() => ReadOrder_itemsFiltersSchema)),
	product_reviews: v.nullish(v.lazy(() => ReadReviewsFiltersSchema)),
	product_cart_items: v.nullish(v.lazy(() => ReadCart_itemsFiltersSchema)),
});

export default ReadProductsFiltersSchema;

export type TReadProductsFiltersSchemaOutput = v.InferOutput<typeof ReadProductsFiltersSchema>;
export type TReadProductsFiltersSchemaInput = v.InferInput<typeof ReadProductsFiltersSchema>;
