import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserInterestRelationsSchema, {
	ReadUserInterestRelations,
} from '../../users/generated-schemas/read-user-interest-relations.schema';
import ReadBannerRelationsSchema, {
	ReadBannerRelations,
} from '../../banners/generated-schemas/read-banner-relations.schema';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import ReadTranslationRelationsSchema, {
	ReadTranslationRelations,
} from '../../translations/generated-schemas/read-translation-relations.schema';
import ReadCategoryFilterRelationsSchema, {
	ReadCategoryFilterRelations,
} from '../../category-fitlers/generated-schemas/read-category-filter-relations.schema';
import ReadAdRelationsSchema, { ReadAdRelations } from '../../ads/generated-schemas/read-ad-relations.schema';

export class ReadCategoryRelations {
	interestedIn?: ReadUserInterestRelations | string | boolean;
	banners?: ReadBannerRelations | string | boolean;
	icon?: ReadMediaRelations | string | boolean;
	translations?: ReadTranslationRelations | string | boolean;
	filters?: ReadCategoryFilterRelations | string | boolean;
	ads?: ReadAdRelations | string | boolean;
	filter?: ReadCategoryFilterRelations | string | boolean;
}

const ReadCategoryRelationsSchema: v.GenericSchema<ReadCategoryRelations> = v.object({
	interestedIn: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserInterestRelationsSchema),
		]),
	),
	banners: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBannerRelationsSchema),
		]),
	),
	icon: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
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
	filters: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryFilterRelationsSchema),
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
	filter: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryFilterRelationsSchema),
		]),
	),
});

export default ReadCategoryRelationsSchema;

export type TReadCategoryRelationsSchemaOutput = v.InferOutput<typeof ReadCategoryRelationsSchema>;
export type TReadCategoryRelationsSchemaInput = v.InferInput<typeof ReadCategoryRelationsSchema>;
