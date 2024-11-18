import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import {
	ReadMediaRelationsSchema,
	ReadMediaRelationsSchemaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import {
	ReadProductRelationsSchema,
	ReadProductRelationsSchemaRelations,
} from '../../products/generated-schemas/read-product-relations.schema';
import {
	ReadBrandProfileRelationsSchema,
	ReadBrandProfileRelationsSchemaRelations,
} from '../../users/generated-schemas/read-brand-profile-relations.schema';
import {
	ReadSeasonalPromotionRelationsSchema,
	ReadSeasonalPromotionRelationsSchemaRelations,
} from '../../promotions/generated-schemas/read-seasonal-promotion-relations.schema';

export class ReadCategoryRelationsSchemaRelations {
	media?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
	subCategories?: ReadCategoryRelationsSchemaRelations | boolean | null | undefined;
	superCategory?: ReadCategoryRelationsSchemaRelations | boolean | null | undefined;
	products?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
	categorybrandProfiles?:
		| ReadBrandProfileRelationsSchemaRelations
		| boolean
		| null
		| undefined;
	subCategoriesBrandProfiles?:
		| ReadBrandProfileRelationsSchemaRelations
		| boolean
		| null
		| undefined;
	seasonalPromotions?:
		| ReadSeasonalPromotionRelationsSchemaRelations
		| boolean
		| null
		| undefined;
}

export const ReadCategoryRelationsSchema: v.GenericSchema<ReadCategoryRelationsSchemaRelations> =
	v.object({
		media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
		subCategories: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)]),
		),
		superCategory: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)]),
		),
		products: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
		categorybrandProfiles: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)]),
		),
		subCategoriesBrandProfiles: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)]),
		),
		seasonalPromotions: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadSeasonalPromotionRelationsSchema)]),
		),
	});

export type TReadCategoryRelationsSchema = v.InferOutput<
	typeof ReadCategoryRelationsSchema
>;

export type TReadCategoryRelationsSchemaInput = v.InferInput<
	typeof ReadCategoryRelationsSchema
>;
