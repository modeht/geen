import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { LanguageEnum } from '../../../lib/enums';
import { GenderEnum } from '../../users/entities/user.entity';
import { RoleEnum } from '../../users/entities/user.entity';
import { PaymentStatusEnum } from '../../ads/entities/ad.entity';
const CreateGovernorateSchema = v.pipe(
	v.object({
		name: v.string(),
		translations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ columns: v.nullish(v.any()), language: v.enum(LanguageEnum) })),
			]),
		),
		country: v.nullish(v.union([v.object({ id: v.number() }), v.object({ name: v.string() })])),
		users: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
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
						dateOfBirth: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						isBlocked: v.nullish(v.boolean()),
						rating: v.nullish(v.number()),
						reviewsCount: v.nullish(v.number()),
						gender: v.nullish(v.enum(GenderEnum)),
						role: v.nullish(v.enum(RoleEnum)),
						permissions: v.nullish(v.any()),
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
	}),
	v.metadata({
		[modelSymbol]: 'GovernorateEntity',
		translations: 'TranslationEntity',
		country: 'CountryEntity',
		users: 'UserEntity',
		ads: 'AdEntity',
	}),
);
export default CreateGovernorateSchema;

export type TCreateGovernorateSchemaInput = v.InferInput<typeof CreateGovernorateSchema>;
export type TCreateGovernorateSchemaOutput = v.InferOutput<typeof CreateGovernorateSchema>;
