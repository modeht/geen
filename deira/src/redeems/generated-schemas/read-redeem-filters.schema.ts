import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';

export class ReadRedeemFiltersSchemaFilters {
	referrer?: ReadUserFiltersSchemaFilters | null;
	redeemer?: ReadUserFiltersSchemaFilters | null;
	amount?: GenericComparable<'number'> | null;
}

const ReadRedeemFiltersSchema: v.GenericSchema<ReadRedeemFiltersSchemaFilters> = v.object({
	referrer: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	redeemer: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	amount: v.nullish(comparable('number')),
});

export default ReadRedeemFiltersSchema;

export type TReadRedeemFiltersSchemaOutput = v.InferOutput<typeof ReadRedeemFiltersSchema>;
export type TReadRedeemFiltersSchemaInput = v.InferInput<typeof ReadRedeemFiltersSchema>;
