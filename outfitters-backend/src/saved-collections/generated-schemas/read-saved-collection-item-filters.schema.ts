import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadSavedCollectionFiltersSchema, {
	ReadSavedCollectionFiltersSchemaFilters,
} from './read-saved-collection-filters.schema';
import ReadProductFiltersSchema, {
	ReadProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-filters.schema';
import ReadPostFiltersSchema, {
	ReadPostFiltersSchemaFilters,
} from '../../posts/generated-schemas/read-post-filters.schema';

export class ReadSavedCollectionItemFiltersSchemaFilters {
	savedCollection?: ReadSavedCollectionFiltersSchemaFilters | null;
	product?: ReadProductFiltersSchemaFilters | null;
	post?: ReadPostFiltersSchemaFilters | null;
	savedCollectionId?: GenericComparable<'number'> | null;
	productId?: GenericComparable<'number'> | null;
	postId?: GenericComparable<'number'> | null;
	userId?: GenericComparable<'number'> | null;
}

const ReadSavedCollectionItemFiltersSchema: v.GenericSchema<ReadSavedCollectionItemFiltersSchemaFilters> = v.object({
	savedCollection: v.nullish(v.lazy(() => ReadSavedCollectionFiltersSchema)),
	product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
	post: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
	savedCollectionId: v.nullish(comparable('number')),
	productId: v.nullish(comparable('number')),
	postId: v.nullish(comparable('number')),
	userId: v.nullish(comparable('number')),
});

export default ReadSavedCollectionItemFiltersSchema;

export type TReadSavedCollectionItemFiltersSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemFiltersSchema>;
export type TReadSavedCollectionItemFiltersSchemaInput = v.InferInput<typeof ReadSavedCollectionItemFiltersSchema>;
