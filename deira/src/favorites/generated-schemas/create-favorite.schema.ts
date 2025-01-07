import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { PaymentStatusEnum } from '../../ads/entities/ad.entity';
import { GenderEnum } from '../../users/entities/user.entity';
import { RoleEnum } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
const CreateFavoriteSchema = v.pipe(
	v.object({
		ad: v.nullish(
			v.union([
				v.object({ id: v.number() }),
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
			]),
		),
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
	}),
	v.metadata({ [modelSymbol]: 'FavoriteEntity', ad: 'AdEntity', user: 'UserEntity' }),
);
export default CreateFavoriteSchema;

export type TCreateFavoriteSchemaInput = v.InferInput<typeof CreateFavoriteSchema>;
export type TCreateFavoriteSchemaOutput = v.InferOutput<typeof CreateFavoriteSchema>;
