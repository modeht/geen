import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadProductFiltersSchema, { ReadProductFiltersSchemaFilters } from './read-product-filters.schema';
import ReadProductOptionValueFiltersSchema, {
	ReadProductOptionValueFiltersSchemaFilters,
} from './read-product-option-value-filters.schema';

export class ReadProductOptionFiltersSchemaFilters {
	name?: GenericComparable<'string'> | null;
	productId?: GenericComparable<'number'> | null;
	product?: ReadProductFiltersSchemaFilters | null;
	values?: ReadProductOptionValueFiltersSchemaFilters | null;
}

const ReadProductOptionFiltersSchema: v.GenericSchema<ReadProductOptionFiltersSchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	productId: v.nullish(comparable('number')),
	product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
	values: v.nullish(v.lazy(() => ReadProductOptionValueFiltersSchema)),
});

export default ReadProductOptionFiltersSchema;

export type TReadProductOptionFiltersSchemaOutput = v.InferOutput<typeof ReadProductOptionFiltersSchema>;
export type TReadProductOptionFiltersSchemaInput = v.InferInput<typeof ReadProductOptionFiltersSchema>;
