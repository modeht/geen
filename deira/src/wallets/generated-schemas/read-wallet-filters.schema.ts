import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadWalletLogFiltersSchema, { ReadWalletLogFiltersSchemaFilters } from './read-wallet-log-filters.schema';

export class ReadWalletFiltersSchemaFilters {
	balance?: GenericComparable<'number'> | null;
	user?: ReadUserFiltersSchemaFilters | null;
	logs?: ReadWalletLogFiltersSchemaFilters | null;
}

const ReadWalletFiltersSchema: v.GenericSchema<ReadWalletFiltersSchemaFilters> = v.object({
	balance: v.nullish(comparable('number')),
	user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	logs: v.nullish(v.lazy(() => ReadWalletLogFiltersSchema)),
});

export default ReadWalletFiltersSchema;

export type TReadWalletFiltersSchemaOutput = v.InferOutput<typeof ReadWalletFiltersSchema>;
export type TReadWalletFiltersSchemaInput = v.InferInput<typeof ReadWalletFiltersSchema>;
