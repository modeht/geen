import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadTranslationRelationsSchema, {
	ReadTranslationRelations,
} from '../../translations/generated-schemas/read-translation-relations.schema';
import ReadGovernorateRelationsSchema, {
	ReadGovernorateRelations,
} from '../../governorate/generated-schemas/read-governorate-relations.schema';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';

export class ReadCountryRelations {
	translations?: ReadTranslationRelations | string | boolean;
	governorates?: ReadGovernorateRelations | string | boolean;
	users?: ReadUserRelations | string | boolean;
}

const ReadCountryRelationsSchema: v.GenericSchema<ReadCountryRelations> = v.object({
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
	governorates: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadGovernorateRelationsSchema),
		]),
	),
	users: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
});

export default ReadCountryRelationsSchema;

export type TReadCountryRelationsSchemaOutput = v.InferOutput<typeof ReadCountryRelationsSchema>;
export type TReadCountryRelationsSchemaInput = v.InferInput<typeof ReadCountryRelationsSchema>;
