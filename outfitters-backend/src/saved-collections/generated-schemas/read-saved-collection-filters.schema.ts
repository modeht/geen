import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadSavedCollectionItemFiltersSchema, {
	ReadSavedCollectionItemFiltersSchemaFilters,
} from './read-saved-collection-item-filters.schema';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';

export class ReadSavedCollectionFiltersSchemaFilters {
	name?: GenericComparable<'string'> | null;
	items?: ReadSavedCollectionItemFiltersSchemaFilters | null;
	user?: ReadUserFiltersSchemaFilters | null;
	userId?: GenericComparable<'number'> | null;
}

const ReadSavedCollectionFiltersSchema: v.GenericSchema<ReadSavedCollectionFiltersSchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	items: v.nullish(v.lazy(() => ReadSavedCollectionItemFiltersSchema)),
	user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	userId: v.nullish(comparable('number')),
});

export default ReadSavedCollectionFiltersSchema;

export type TReadSavedCollectionFiltersSchemaOutput = v.InferOutput<typeof ReadSavedCollectionFiltersSchema>;
export type TReadSavedCollectionFiltersSchemaInput = v.InferInput<typeof ReadSavedCollectionFiltersSchema>;
