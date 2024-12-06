import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import ReadProductRelationsSchema, {
	ReadProductRelations,
} from '../../products/generated-schemas/read-product-relations.schema';
import ReadBrandProfileRelationsSchema, {
	ReadBrandProfileRelations,
} from '../../users/generated-schemas/read-brand-profile-relations.schema';
import ReadSeasonalPromotionRelationsSchema, {
	ReadSeasonalPromotionRelations,
} from '../../promotions/generated-schemas/read-seasonal-promotion-relations.schema';

export class ReadCategoryRelations {
	media?: ReadMediaRelations | string | boolean;
	subCategories?: ReadCategoryRelations | string | boolean;
	superCategory?: ReadCategoryRelations | string | boolean;
	products?: ReadProductRelations | string | boolean;
	categorybrandProfiles?: ReadBrandProfileRelations | string | boolean;
	subCategoriesBrandProfiles?: ReadBrandProfileRelations | string | boolean;
	seasonalPromotions?: ReadSeasonalPromotionRelations | string | boolean;
}

const ReadCategoryRelationsSchema: v.GenericSchema<ReadCategoryRelations> = v.object({
	media: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
		]),
	),
	subCategories: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
		]),
	),
	superCategory: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
		]),
	),
	products: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductRelationsSchema),
		]),
	),
	categorybrandProfiles: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBrandProfileRelationsSchema),
		]),
	),
	subCategoriesBrandProfiles: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBrandProfileRelationsSchema),
		]),
	),
	seasonalPromotions: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadSeasonalPromotionRelationsSchema),
		]),
	),
});

export default ReadCategoryRelationsSchema;

export type TReadCategoryRelationsSchemaOutput = v.InferOutput<typeof ReadCategoryRelationsSchema>;
export type TReadCategoryRelationsSchemaInput = v.InferInput<typeof ReadCategoryRelationsSchema>;
