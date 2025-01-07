import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadWalletFiltersSchema, { ReadWalletFiltersSchemaFilters } from './read-wallet-filters.schema';
import ReadTranslationFiltersSchema, {
	ReadTranslationFiltersSchemaFilters,
} from '../../translations/generated-schemas/read-translation-filters.schema';
import ReadPlanFiltersSchema, {
	ReadPlanFiltersSchemaFilters,
} from '../../plans/generated-schemas/read-plan-filters.schema';

export class ReadWalletLogFiltersSchemaFilters {
	user?: ReadUserFiltersSchemaFilters | null;
	wallet?: ReadWalletFiltersSchemaFilters | null;
	translations?: ReadTranslationFiltersSchemaFilters | null;
	description?: GenericComparable<'string'> | null;
	plan?: ReadPlanFiltersSchemaFilters | null;
	amount?: GenericComparable<'number'> | null;
}

const ReadWalletLogFiltersSchema: v.GenericSchema<ReadWalletLogFiltersSchemaFilters> = v.object({
	user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	wallet: v.nullish(v.lazy(() => ReadWalletFiltersSchema)),
	translations: v.nullish(v.lazy(() => ReadTranslationFiltersSchema)),
	description: v.nullish(comparable('string')),
	plan: v.nullish(v.lazy(() => ReadPlanFiltersSchema)),
	amount: v.nullish(comparable('number')),
});

export default ReadWalletLogFiltersSchema;

export type TReadWalletLogFiltersSchemaOutput = v.InferOutput<typeof ReadWalletLogFiltersSchema>;
export type TReadWalletLogFiltersSchemaInput = v.InferInput<typeof ReadWalletLogFiltersSchema>;
