import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import { PlanTypeEnum } from '../entities/plan.entity';
import ReadAdRelationsSchema, { ReadAdRelations } from '../../ads/generated-schemas/read-ad-relations.schema';
import ReadTranslationRelationsSchema, {
	ReadTranslationRelations,
} from '../../translations/generated-schemas/read-translation-relations.schema';
import ReadWalletLogRelationsSchema, {
	ReadWalletLogRelations,
} from '../../wallets/generated-schemas/read-wallet-log-relations.schema';

export class ReadPlanRelations {
	ads?: ReadAdRelations | string | boolean;
	translations?: ReadTranslationRelations | string | boolean;
	walletLogs?: ReadWalletLogRelations | string | boolean;
	type?: PlanTypeEnum | null;
}

const ReadPlanRelationsSchema: v.GenericSchema<ReadPlanRelations> = v.object({
	ads: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadAdRelationsSchema),
		]),
	),
	translations: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadTranslationRelationsSchema),
		]),
	),
	walletLogs: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadWalletLogRelationsSchema),
		]),
	),
	type: v.nullish(v.enum(PlanTypeEnum)),
});

export default ReadPlanRelationsSchema;

export type TReadPlanRelationsSchemaOutput = v.InferOutput<typeof ReadPlanRelationsSchema>;
export type TReadPlanRelationsSchemaInput = v.InferInput<typeof ReadPlanRelationsSchema>;
