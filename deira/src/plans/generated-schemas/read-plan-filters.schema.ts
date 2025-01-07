import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import { PlanTypeEnum } from '../entities/plan.entity';
import ReadAdFiltersSchema, { ReadAdFiltersSchemaFilters } from '../../ads/generated-schemas/read-ad-filters.schema';
import ReadTranslationFiltersSchema, {
	ReadTranslationFiltersSchemaFilters,
} from '../../translations/generated-schemas/read-translation-filters.schema';
import ReadWalletLogFiltersSchema, {
	ReadWalletLogFiltersSchemaFilters,
} from '../../wallets/generated-schemas/read-wallet-log-filters.schema';

export class ReadPlanFiltersSchemaFilters {
	name?: GenericComparable<'string'> | null;
	description?: GenericComparable<'string'> | null;
	price?: GenericComparable<'number'> | null;
	mediaLimit?: GenericComparable<'number'> | null;
	videoLimit?: GenericComparable<'number'> | null;
	durationDays?: GenericComparable<'number'> | null;
	index?: GenericComparable<'number'> | null;
	ads?: ReadAdFiltersSchemaFilters | null;
	translations?: ReadTranslationFiltersSchemaFilters | null;
	walletLogs?: ReadWalletLogFiltersSchemaFilters | null;
	type?: PlanTypeEnum | null;
	isArchived?: GenericComparable<'bool'> | null;
}

const ReadPlanFiltersSchema: v.GenericSchema<ReadPlanFiltersSchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	description: v.nullish(comparable('string')),
	price: v.nullish(comparable('number')),
	mediaLimit: v.nullish(comparable('number')),
	videoLimit: v.nullish(comparable('number')),
	durationDays: v.nullish(comparable('number')),
	index: v.nullish(comparable('number')),
	ads: v.nullish(v.lazy(() => ReadAdFiltersSchema)),
	translations: v.nullish(v.lazy(() => ReadTranslationFiltersSchema)),
	walletLogs: v.nullish(v.lazy(() => ReadWalletLogFiltersSchema)),
	type: v.nullish(v.enum(PlanTypeEnum)),
	isArchived: v.nullish(comparable('bool')),
});

export default ReadPlanFiltersSchema;

export type TReadPlanFiltersSchemaOutput = v.InferOutput<typeof ReadPlanFiltersSchema>;
export type TReadPlanFiltersSchemaInput = v.InferInput<typeof ReadPlanFiltersSchema>;
