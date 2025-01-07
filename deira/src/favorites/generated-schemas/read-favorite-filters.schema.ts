import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadAdFiltersSchema, { ReadAdFiltersSchemaFilters } from '../../ads/generated-schemas/read-ad-filters.schema';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';

export class ReadFavoriteFiltersSchemaFilters {
	ad?: ReadAdFiltersSchemaFilters | null;
	user?: ReadUserFiltersSchemaFilters | null;
}

const ReadFavoriteFiltersSchema: v.GenericSchema<ReadFavoriteFiltersSchemaFilters> = v.object({
	ad: v.nullish(v.lazy(() => ReadAdFiltersSchema)),
	user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
});

export default ReadFavoriteFiltersSchema;

export type TReadFavoriteFiltersSchemaOutput = v.InferOutput<typeof ReadFavoriteFiltersSchema>;
export type TReadFavoriteFiltersSchemaInput = v.InferInput<typeof ReadFavoriteFiltersSchema>;
