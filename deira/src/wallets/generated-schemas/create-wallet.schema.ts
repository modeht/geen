import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { GenderEnum } from '../../users/entities/user.entity';
import { RoleEnum } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
const CreateWalletSchema = v.pipe(
	v.object({
		balance: v.number(),
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
					dateOfBirth: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					isBlocked: v.nullish(v.boolean()),
					rating: v.nullish(v.number()),
					reviewsCount: v.nullish(v.number()),
					gender: v.nullish(v.enum(GenderEnum)),
					role: v.nullish(v.enum(RoleEnum)),
					permissions: v.nullish(v.any()),
				}),
			]),
		),
		logs: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ description: v.nullish(v.string()), amount: v.number() })),
			]),
		),
	}),
	v.metadata({ [modelSymbol]: 'WalletEntity', user: 'UserEntity', logs: 'WalletLogEntity' }),
);
export default CreateWalletSchema;

export type TCreateWalletSchemaInput = v.InferInput<typeof CreateWalletSchema>;
export type TCreateWalletSchemaOutput = v.InferOutput<typeof CreateWalletSchema>;
