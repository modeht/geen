import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import {
	ReadPromotionRelationsSchema,
	ReadPromotionRelationsSchemaRelations,
} from './read-promotion-relations.schema';
import {
	ReadCategoryRelationsSchema,
	ReadCategoryRelationsSchemaRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';

export class ReadSeasonalPromotionRelationsSchemaRelations {
	promotions?: ReadPromotionRelationsSchemaRelations | boolean | null | undefined;
	subCategories?: ReadCategoryRelationsSchemaRelations | boolean | null | undefined;
}

export const ReadSeasonalPromotionRelationsSchema: v.GenericSchema<ReadSeasonalPromotionRelationsSchemaRelations> =
	v.object({
		promotions: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadPromotionRelationsSchema)]),
		),
		subCategories: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)]),
		),
	});

export type TReadSeasonalPromotionRelationsSchema = v.InferOutput<
	typeof ReadSeasonalPromotionRelationsSchema
>;

export type TReadSeasonalPromotionRelationsSchemaInput = v.InferInput<
	typeof ReadSeasonalPromotionRelationsSchema
>;
