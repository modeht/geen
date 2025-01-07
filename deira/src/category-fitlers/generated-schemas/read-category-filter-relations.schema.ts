import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadTranslationRelationsSchema, {
	ReadTranslationRelations,
} from '../../translations/generated-schemas/read-translation-relations.schema';
import ReadCategoryRelationsSchema, {
	ReadCategoryRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';
import ReadAdRelationsSchema, { ReadAdRelations } from '../../ads/generated-schemas/read-ad-relations.schema';

export class ReadCategoryFilterRelations {
	translations?: ReadTranslationRelations | string | boolean;
	category?: ReadCategoryRelations | string | boolean;
	categories?: ReadCategoryRelations | string | boolean;
	ads?: ReadAdRelations | string | boolean;
}

const ReadCategoryFilterRelationsSchema: v.GenericSchema<ReadCategoryFilterRelations> = v.object({
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
	categories: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
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

export default ReadCategoryFilterRelationsSchema;

export type TReadCategoryFilterRelationsSchemaOutput = v.InferOutput<typeof ReadCategoryFilterRelationsSchema>;
export type TReadCategoryFilterRelationsSchemaInput = v.InferInput<typeof ReadCategoryFilterRelationsSchema>;
