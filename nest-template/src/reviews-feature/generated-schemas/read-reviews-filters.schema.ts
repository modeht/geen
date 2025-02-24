import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersFiltersSchema, {
	ReadUsersFiltersSchemaFilters,
} from '../../users-feature/generated-schemas/read-users-filters.schema';
import ReadProductsFiltersSchema, {
	ReadProductsFiltersSchemaFilters,
} from '../../products-feature/generated-schemas/read-products-filters.schema';

export class ReadReviewsFiltersSchemaFilters {
	user_id?: ReadUsersFiltersSchemaFilters | null;
	product_id?: ReadProductsFiltersSchemaFilters | null;
	rating?: GenericComparable<'number'> | null;
	review_text?: GenericComparable<'string'> | null;
}

const ReadReviewsFiltersSchema: v.GenericSchema<ReadReviewsFiltersSchemaFilters> = v.object({
	user_id: v.nullish(v.lazy(() => ReadUsersFiltersSchema)),
	product_id: v.nullish(v.lazy(() => ReadProductsFiltersSchema)),
	rating: v.nullish(comparable('number')),
	review_text: v.nullish(comparable('string')),
});

export default ReadReviewsFiltersSchema;

export type TReadReviewsFiltersSchemaOutput = v.InferOutput<typeof ReadReviewsFiltersSchema>;
export type TReadReviewsFiltersSchemaInput = v.InferInput<typeof ReadReviewsFiltersSchema>;
