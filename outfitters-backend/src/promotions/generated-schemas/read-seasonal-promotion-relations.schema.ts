import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadPromotionRelationsSchema, { ReadPromotionRelations } from './read-promotion-relations.schema';
import ReadCategoryRelationsSchema, {
	ReadCategoryRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';

import { PromotionStatusEnum } from '../entities/enums';
export class ReadSeasonalPromotionRelations {
	status?: PromotionStatusEnum | null;
	promotions?: ReadPromotionRelations | string | boolean;
	subCategories?: ReadCategoryRelations | string | boolean;
}

const ReadSeasonalPromotionRelationsSchema: v.GenericSchema<ReadSeasonalPromotionRelations> = v.object({
	status: v.nullish(v.enum(PromotionStatusEnum)),
	promotions: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPromotionRelationsSchema),
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
});

export default ReadSeasonalPromotionRelationsSchema;

export type TReadSeasonalPromotionRelationsSchemaOutput = v.InferOutput<typeof ReadSeasonalPromotionRelationsSchema>;
export type TReadSeasonalPromotionRelationsSchemaInput = v.InferInput<typeof ReadSeasonalPromotionRelationsSchema>;
