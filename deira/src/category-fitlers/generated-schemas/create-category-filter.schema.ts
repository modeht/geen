import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { LanguageEnum } from '../../../lib/enums';
import { PaymentStatusEnum } from '../../ads/entities/ad.entity';
const CreateCategoryFilterSchema = v.pipe(
	v.object({
		translations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ columns: v.nullish(v.any()), language: v.enum(LanguageEnum) })),
			]),
		),
		name: v.nullish(v.string()),
		category: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					name: v.nullish(v.string()),
					visible: v.boolean(),
					isArchived: v.boolean(),
					index: v.nullish(v.number()),
				}),
			]),
		),
		categories: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						name: v.nullish(v.string()),
						visible: v.boolean(),
						isArchived: v.boolean(),
						index: v.nullish(v.number()),
					}),
				),
			]),
		),
		ads: v.nullish(
			v.union([
				v.array(
					v.object({
						start: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						end: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						price: v.number(),
						enableWhatsapp: v.boolean(),
						enablePhone: v.boolean(),
						paymentStatus: v.nullish(v.enum(PaymentStatusEnum)),
						title: v.nullish(v.pipe(v.string(), v.maxLength(255))),
						description: v.nullish(v.string()),
						isBlocked: v.nullish(v.boolean()),
						viewsCount: v.nullish(v.number()),
					}),
				),
			]),
		),
		isArchived: v.boolean(),
	}),
	v.metadata({
		[modelSymbol]: 'CategoryFilterEntity',
		translations: 'TranslationEntity',
		category: 'CategoryEntity',
		categories: 'CategoryEntity',
		ads: 'AdEntity',
	}),
);
export default CreateCategoryFilterSchema;

export type TCreateCategoryFilterSchemaInput = v.InferInput<typeof CreateCategoryFilterSchema>;
export type TCreateCategoryFilterSchemaOutput = v.InferOutput<typeof CreateCategoryFilterSchema>;
