import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadSellersFiltersSchema, {
	ReadSellersFiltersSchemaFilters,
} from '../../sellers-feature/generated-schemas/read-sellers-filters.schema';

export class ReadProductsFiltersSchemaFilters {
	seller_id?: ReadSellersFiltersSchemaFilters | null;
	name?: GenericComparable<'string'> | null;
	description?: GenericComparable<'string'> | null;
	price?: GenericComparable<'number'> | null;
	inventory_count?: GenericComparable<'number'> | null;
}

const ReadProductsFiltersSchema: v.GenericSchema<ReadProductsFiltersSchemaFilters> = v.object({
	seller_id: v.nullish(v.lazy(() => ReadSellersFiltersSchema)),
	name: v.nullish(comparable('string')),
	description: v.nullish(comparable('string')),
	price: v.nullish(comparable('number')),
	inventory_count: v.nullish(comparable('number')),
});

export default ReadProductsFiltersSchema;

export type TReadProductsFiltersSchemaOutput = v.InferOutput<typeof ReadProductsFiltersSchema>;
export type TReadProductsFiltersSchemaInput = v.InferInput<typeof ReadProductsFiltersSchema>;
