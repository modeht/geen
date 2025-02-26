import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadProductsFiltersSchema, {
	ReadProductsFiltersSchemaFilters,
} from '../../products-feature/generated-schemas/read-products-filters.schema';
import ReadUsersFiltersSchema, {
	ReadUsersFiltersSchemaFilters,
} from '../../users-feature/generated-schemas/read-users-filters.schema';

export class ReadReviewsFiltersSchemaFilters {
	product_id?: GenericComparable<'number'> | null;
	review_product?: ReadProductsFiltersSchemaFilters | null;
	user_id?: GenericComparable<'number'> | null;
	review_user?: ReadUsersFiltersSchemaFilters | null;
	rating?: GenericComparable<'number'> | null;
	comment?: GenericComparable<'string'> | null;
}

const ReadReviewsFiltersSchema: v.GenericSchema<ReadReviewsFiltersSchemaFilters> = v.object({
	product_id: v.nullish(comparable('number')),
	review_product: v.nullish(v.lazy(() => ReadProductsFiltersSchema)),
	user_id: v.nullish(comparable('number')),
	review_user: v.nullish(v.lazy(() => ReadUsersFiltersSchema)),
	rating: v.nullish(comparable('number')),
	comment: v.nullish(comparable('string')),
});

export default ReadReviewsFiltersSchema;

export type TReadReviewsFiltersSchemaOutput = v.InferOutput<typeof ReadReviewsFiltersSchema>;
export type TReadReviewsFiltersSchemaInput = v.InferInput<typeof ReadReviewsFiltersSchema>;
