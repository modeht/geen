import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { searchMode } from '../entities/recent-searches.entity';
import { AccountStatus } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
const UpdateRecentSearchesSchema = v.pipe(
	v.object({
		keyword: v.nullish(v.string()),
		mode: v.optional(v.enum(searchMode)),
		user: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					status: v.enum(AccountStatus),
					email: v.nullish(v.string()),
					phone: v.nullish(v.string()),
					password: v.nullish(v.string()),
					firebaseId: v.nullish(v.string()),
					emailVerified: v.nullish(v.boolean()),
					isGoogleSignin: v.nullish(v.boolean()),
					isAppleSignin: v.nullish(v.boolean()),
					defaultLang: v.enum(LanguageEnum),
					isFollowing: v.nullish(v.boolean()),
					isBlockedBy: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
				}),
			]),
		),
		userId: v.optional(v.number()),
	}),
	v.metadata({ [modelSymbol]: 'RecentSearchesEntity', user: 'UserEntity' }),
);
export default UpdateRecentSearchesSchema;

export type TUpdateRecentSearchesSchemaInput = v.InferInput<typeof UpdateRecentSearchesSchema>;
export type TUpdateRecentSearchesSchemaOutput = v.InferOutput<typeof UpdateRecentSearchesSchema>;
