import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadCategoryFilterRelationsSchema, {
	ReadCategoryFilterRelations,
} from '../../category-fitlers/generated-schemas/read-category-filter-relations.schema';
import ReadWalletLogRelationsSchema, {
	ReadWalletLogRelations,
} from '../../wallets/generated-schemas/read-wallet-log-relations.schema';
import ReadCategoryRelationsSchema, {
	ReadCategoryRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';
import ReadPlanRelationsSchema, { ReadPlanRelations } from '../../plans/generated-schemas/read-plan-relations.schema';
import ReadCountryRelationsSchema, {
	ReadCountryRelations,
} from '../../countries/generated-schemas/read-country-relations.schema';
import ReadGovernorateRelationsSchema, {
	ReadGovernorateRelations,
} from '../../governorate/generated-schemas/read-governorate-relations.schema';

import { LanguageEnum } from '../../../lib/enums';
export class ReadTranslationRelations {
	categoryFilter?: ReadCategoryFilterRelations | string | boolean;
	log?: ReadWalletLogRelations | string | boolean;
	category?: ReadCategoryRelations | string | boolean;
	plan?: ReadPlanRelations | string | boolean;
	country?: ReadCountryRelations | string | boolean;
	governorate?: ReadGovernorateRelations | string | boolean;
	language?: LanguageEnum | null;
}

const ReadTranslationRelationsSchema: v.GenericSchema<ReadTranslationRelations> = v.object({
	categoryFilter: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryFilterRelationsSchema),
		]),
	),
	log: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadWalletLogRelationsSchema),
		]),
	),
	category: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
		]),
	),
	plan: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPlanRelationsSchema),
		]),
	),
	country: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCountryRelationsSchema),
		]),
	),
	governorate: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadGovernorateRelationsSchema),
		]),
	),
	language: v.nullish(v.enum(LanguageEnum)),
});

export default ReadTranslationRelationsSchema;

export type TReadTranslationRelationsSchemaOutput = v.InferOutput<typeof ReadTranslationRelationsSchema>;
export type TReadTranslationRelationsSchemaInput = v.InferInput<typeof ReadTranslationRelationsSchema>;
