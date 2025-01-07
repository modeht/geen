import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { GenderEnum } from '../entities/user.entity';
import { RoleEnum } from '../entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
const CreateUserInterestSchema = v.pipe(
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
		userId: v.number(),
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
		categoryId: v.number(),
		count: v.number(),
	}),
	v.metadata({ [modelSymbol]: 'UserInterestEntity', user: 'UserEntity', category: 'CategoryEntity' }),
);
export default CreateUserInterestSchema;

export type TCreateUserInterestSchemaInput = v.InferInput<typeof CreateUserInterestSchema>;
export type TCreateUserInterestSchemaOutput = v.InferOutput<typeof CreateUserInterestSchema>;
