import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadTranslationRelationsSchema, {
	ReadTranslationRelations,
} from '../../translations/generated-schemas/read-translation-relations.schema';
import ReadCountryRelationsSchema, {
	ReadCountryRelations,
} from '../../countries/generated-schemas/read-country-relations.schema';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadAdRelationsSchema, { ReadAdRelations } from '../../ads/generated-schemas/read-ad-relations.schema';

export class ReadGovernorateRelations {
	translations?: ReadTranslationRelations | string | boolean;
	country?: ReadCountryRelations | string | boolean;
	users?: ReadUserRelations | string | boolean;
	ads?: ReadAdRelations | string | boolean;
}

const ReadGovernorateRelationsSchema: v.GenericSchema<ReadGovernorateRelations> = v.object({
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
});

export default ReadGovernorateRelationsSchema;

export type TReadGovernorateRelationsSchemaOutput = v.InferOutput<typeof ReadGovernorateRelationsSchema>;
export type TReadGovernorateRelationsSchemaInput = v.InferInput<typeof ReadGovernorateRelationsSchema>;
