import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { PlanTypeEnum } from '../entities/plan.entity';
import { PaymentStatusEnum } from '../../ads/entities/ad.entity';
import { LanguageEnum } from '../../../lib/enums';
const UpdatePlanSchema = v.pipe(
	v.object({
		name: v.nullish(v.string()),
		description: v.nullish(v.string()),
		price: v.nullish(v.number()),
		mediaLimit: v.optional(v.number()),
		videoLimit: v.optional(v.number()),
		durationDays: v.optional(v.number()),
		index: v.nullish(v.number()),
		ads: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						start: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						end: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						price: v.number(),
						enableWhatsapp: v.boolean(),
						enablePhone: v.boolean(),
						paymentStatus: v.nullish(v.enum(PaymentStatusEnum)),
						title: v.nullish(v.string()),
						description: v.nullish(v.string()),
						isBlocked: v.nullish(v.boolean()),
						viewsCount: v.nullish(v.number()),
					}),
				),
			]),
		),
		translations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ columns: v.nullish(v.any()), language: v.enum(LanguageEnum) })),
			]),
		),
		walletLogs: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ description: v.nullish(v.string()), amount: v.number() })),
			]),
		),
		type: v.nullish(v.enum(PlanTypeEnum)),
		isArchived: v.nullish(v.boolean()),
	}),
	v.metadata({
		[modelSymbol]: 'PlanEntity',
		ads: 'AdEntity',
		translations: 'TranslationEntity',
		walletLogs: 'WalletLogEntity',
	}),
);
export default UpdatePlanSchema;

export type TUpdatePlanSchemaInput = v.InferInput<typeof UpdatePlanSchema>;
export type TUpdatePlanSchemaOutput = v.InferOutput<typeof UpdatePlanSchema>;
