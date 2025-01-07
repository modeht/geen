import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { GenderEnum } from '../../users/entities/user.entity';
import { RoleEnum } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
import { PlanTypeEnum } from '../../plans/entities/plan.entity';
const UpdateWalletLogSchema = v.pipe(
	v.object({
		user: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					username: v.nullish(v.string()),
					phone: v.nullish(v.string()),
					referralCode: v.nullish(v.string()),
					referrerCode: v.nullish(v.string()),
					email: v.nullish(v.string()),
					notifToken: v.nullish(v.string()),
					password: v.nullish(v.string()),
					fbId: v.nullish(v.string()),
					emailVerified: v.nullish(v.boolean()),
					defaultLang: v.nullish(v.enum(LanguageEnum)),
					dateOfBirth: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
					isBlocked: v.nullish(v.boolean()),
					rating: v.nullish(v.number()),
					reviewsCount: v.nullish(v.number()),
					gender: v.nullish(v.enum(GenderEnum)),
					role: v.nullish(v.enum(RoleEnum)),
					permissions: v.any(),
				}),
			]),
		),
		wallet: v.nullish(v.union([v.object({ id: v.number() }), v.object({ balance: v.number() })])),
		translations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ columns: v.nullish(v.any()), language: v.enum(LanguageEnum) })),
			]),
		),
		description: v.nullish(v.string()),
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
		amount: v.optional(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'WalletLogEntity',
		user: 'UserEntity',
		wallet: 'WalletEntity',
		translations: 'TranslationEntity',
		plan: 'PlanEntity',
	}),
);
export default UpdateWalletLogSchema;

export type TUpdateWalletLogSchemaInput = v.InferInput<typeof UpdateWalletLogSchema>;
export type TUpdateWalletLogSchemaOutput = v.InferOutput<typeof UpdateWalletLogSchema>;
