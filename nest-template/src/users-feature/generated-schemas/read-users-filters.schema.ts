import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadProductsFiltersSchema, {
	ReadProductsFiltersSchemaFilters,
} from '../../products-feature/generated-schemas/read-products-filters.schema';
import ReadOrdersFiltersSchema, {
	ReadOrdersFiltersSchemaFilters,
} from '../../orders-feature/generated-schemas/read-orders-filters.schema';
import ReadReviewsFiltersSchema, {
	ReadReviewsFiltersSchemaFilters,
} from '../../reviews-feature/generated-schemas/read-reviews-filters.schema';
import ReadCart_itemsFiltersSchema, {
	ReadCart_itemsFiltersSchemaFilters,
} from '../../cart_items-feature/generated-schemas/read-cart-_items-filters.schema';

export class ReadUsersFiltersSchemaFilters {
	username?: GenericComparable<'string'> | null;
	email?: GenericComparable<'string'> | null;
	password?: GenericComparable<'string'> | null;
	role?: GenericComparable<'string'> | null;
	seller_products?: ReadProductsFiltersSchemaFilters | null;
	user_orders?: ReadOrdersFiltersSchemaFilters | null;
	user_reviews?: ReadReviewsFiltersSchemaFilters | null;
	user_cart_items?: ReadCart_itemsFiltersSchemaFilters | null;
}

const ReadUsersFiltersSchema: v.GenericSchema<ReadUsersFiltersSchemaFilters> = v.object({
	username: v.nullish(comparable('string')),
	email: v.nullish(comparable('string')),
	password: v.nullish(comparable('string')),
	role: v.nullish(comparable('string')),
	seller_products: v.nullish(v.lazy(() => ReadProductsFiltersSchema)),
	user_orders: v.nullish(v.lazy(() => ReadOrdersFiltersSchema)),
	user_reviews: v.nullish(v.lazy(() => ReadReviewsFiltersSchema)),
	user_cart_items: v.nullish(v.lazy(() => ReadCart_itemsFiltersSchema)),
});

export default ReadUsersFiltersSchema;

export type TReadUsersFiltersSchemaOutput = v.InferOutput<typeof ReadUsersFiltersSchema>;
export type TReadUsersFiltersSchemaInput = v.InferInput<typeof ReadUsersFiltersSchema>;
