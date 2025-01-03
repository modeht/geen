import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { PromotionStatusEnum } from '../entities/enums';
import { PromotionTypeEnum } from '../entities/enums';
import { PromotionTargetEnum } from '../entities/enums';
const CreateSeasonalPromotionSchema = v.pipe(
	v.object({
		title: v.string(),
		start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
		end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
		status: v.enum(PromotionStatusEnum),
		promotions: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						title: v.string(),
						type: v.enum(PromotionTypeEnum),
						discountPercentage: v.number(),
						minPurchaseAmount: v.nullish(v.number()),
						start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						target: v.enum(PromotionTargetEnum),
						status: v.enum(PromotionStatusEnum),
						isDeleted: v.boolean(),
						seasonalPromotionId: v.nullish(v.number()),
						brandId: v.number(),
					}),
				),
			]),
		),
		subCategories: v.nullish(
			v.union([
				v.array(
					v.object({
						name: v.string(),
						isArchived: v.boolean(),
						superCategoryId: v.nullish(v.number()),
						test: v.nullish(v.any()),
					}),
				),
			]),
		),
	}),
	v.metadata({
		[modelSymbol]: 'SeasonalPromotionEntity',
		promotions: 'PromotionEntity',
		subCategories: 'CategoryEntity',
	}),
);
export default CreateSeasonalPromotionSchema;

export type TCreateSeasonalPromotionSchemaInput = v.InferInput<typeof CreateSeasonalPromotionSchema>;
export type TCreateSeasonalPromotionSchemaOutput = v.InferOutput<typeof CreateSeasonalPromotionSchema>;
