import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { LanguageEnum } from '../../../lib/enums';
import { GenderEnum } from '../../users/entities/user.entity';
import { RoleEnum } from '../../users/entities/user.entity';
const CreateCountrySchema = v.pipe(
	v.object({
		name: v.string(),
		translations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ columns: v.nullish(v.any()), language: v.enum(LanguageEnum) })),
			]),
		),
		governorates: v.nullish(v.union([v.array(v.object({ id: v.number() })), v.array(v.object({ name: v.string() }))])),
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
	}),
	v.metadata({
		[modelSymbol]: 'CountryEntity',
		translations: 'TranslationEntity',
		governorates: 'GovernorateEntity',
		users: 'UserEntity',
	}),
);
export default CreateCountrySchema;

export type TCreateCountrySchemaInput = v.InferInput<typeof CreateCountrySchema>;
export type TCreateCountrySchemaOutput = v.InferOutput<typeof CreateCountrySchema>;
