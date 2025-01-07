import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadWalletRelationsSchema, { ReadWalletRelations } from './read-wallet-relations.schema';
import ReadTranslationRelationsSchema, {
	ReadTranslationRelations,
} from '../../translations/generated-schemas/read-translation-relations.schema';
import ReadPlanRelationsSchema, { ReadPlanRelations } from '../../plans/generated-schemas/read-plan-relations.schema';

export class ReadWalletLogRelations {
	user?: ReadUserRelations | string | boolean;
	wallet?: ReadWalletRelations | string | boolean;
	translations?: ReadTranslationRelations | string | boolean;
	plan?: ReadPlanRelations | string | boolean;
}

const ReadWalletLogRelationsSchema: v.GenericSchema<ReadWalletLogRelations> = v.object({
	user: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	wallet: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadWalletRelationsSchema),
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
});

export default ReadWalletLogRelationsSchema;

export type TReadWalletLogRelationsSchemaOutput = v.InferOutput<typeof ReadWalletLogRelationsSchema>;
export type TReadWalletLogRelationsSchemaInput = v.InferInput<typeof ReadWalletLogRelationsSchema>;
