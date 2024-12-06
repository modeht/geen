import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { AccountStatus } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
const CreatePostLikesSchema = v.pipe(
	v.object({
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
		post: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					caption: v.nullish(v.string()),
					postedById: v.number(),
					thumbnailId: v.nullish(v.number()),
					likesCount: v.number(),
					commentsCount: v.number(),
					taggedProductsCount: v.number(),
					taggedUsersCount: v.number(),
					isLiked: v.optional(v.boolean()),
				}),
			]),
		),
		userId: v.number(),
		postId: v.number(),
	}),
	v.metadata({ [modelSymbol]: 'PostLikesEntity', user: 'UserEntity', post: 'PostEntity' }),
);
export default CreatePostLikesSchema;

export type TCreatePostLikesSchemaInput = v.InferInput<typeof CreatePostLikesSchema>;
export type TCreatePostLikesSchemaOutput = v.InferOutput<typeof CreatePostLikesSchema>;
