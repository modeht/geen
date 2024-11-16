import * as v from 'valibot';

export const CreateStoryLikesSchema = v.pipe(
	v.object({
		user: v.nullish(
			v.union([
				v.number(),
				v.object({
					email: v.nullish(v.string()),
					phone: v.nullish(v.string()),
					password: v.nullish(v.string()),
					firebaseId: v.nullish(v.string()),
					emailVerified: v.nullish(v.boolean()),
					isGoogleSignin: v.nullish(v.boolean()),
					isAppleSignin: v.nullish(v.boolean()),
					isFollowing: v.nullish(v.boolean()),
					isBlockedBy: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
				}),
			]),
		),
		story: v.nullish(
			v.union([
				v.number(),
				v.object({
					background: v.nullish(v.string()),
					text: v.nullish(v.string()),
					postedById: v.number(),
					taggedProductsCount: v.number(),
					taggedUsersCount: v.number(),
					isLiked: v.undefinedable(v.boolean()),
					isViewed: v.undefinedable(v.boolean()),
				}),
			]),
		),
		userId: v.number(),
		storyId: v.number(),
	}),
	v.metadata({ user: 'UserEntity', story: 'StoryEntity' }),
);

export type TCreateStoryLikesSchema = v.InferInput<typeof CreateStoryLikesSchema>;
