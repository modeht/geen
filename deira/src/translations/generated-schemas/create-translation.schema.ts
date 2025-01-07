import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { PlanTypeEnum } from '../../plans/entities/plan.entity';
import { LanguageEnum } from '../../../lib/enums';
const CreateTranslationSchema = v.pipe(
	v.object({
		categoryFilter: v.nullish(
			v.union([v.object({ id: v.number() }), v.object({ name: v.nullish(v.string()), isArchived: v.boolean() })]),
		),
		log: v.nullish(
			v.union([v.object({ id: v.number() }), v.object({ description: v.nullish(v.string()), amount: v.number() })]),
		),
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
		plan: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					name: v.nullish(v.string()),
					description: v.nullish(v.string()),
					price: v.nullish(v.number()),
					mediaLimit: v.number(),
					videoLimit: v.number(),
					durationDays: v.number(),
					index: v.nullish(v.number()),
					type: v.nullish(v.enum(PlanTypeEnum)),
					isArchived: v.nullish(v.boolean()),
				}),
			]),
		),
		country: v.nullish(v.union([v.object({ id: v.number() }), v.object({ name: v.string() })])),
		governorate: v.nullish(v.union([v.object({ id: v.number() }), v.object({ name: v.string() })])),
		columns: v.nullish(v.any()),
		language: v.enum(LanguageEnum),
	}),
	v.metadata({
		[modelSymbol]: 'TranslationEntity',
		categoryFilter: 'CategoryFilterEntity',
		log: 'WalletLogEntity',
		category: 'CategoryEntity',
		plan: 'PlanEntity',
		country: 'CountryEntity',
		governorate: 'GovernorateEntity',
	}),
);
export default CreateTranslationSchema;

export type TCreateTranslationSchemaInput = v.InferInput<typeof CreateTranslationSchema>;
export type TCreateTranslationSchemaOutput = v.InferOutput<typeof CreateTranslationSchema>;
