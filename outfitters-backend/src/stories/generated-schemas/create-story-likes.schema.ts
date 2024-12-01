import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';


import { AccountStatus } from '../../users/entities/user.entity'
import { LanguageEnum } from '../../../lib/enums'
const CreateStoryLikesSchema = v.pipe(v.object({user: v.nullish(v.union([v.object({ id: v.number() }), v.object({status: v.enum(AccountStatus),
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
followersCount: v.nullish(v.number())})])),
story: v.nullish(v.union([v.object({ id: v.number() }), v.object({background: v.nullish(v.string()),
text: v.nullish(v.string()),
postedById: v.number(),
taggedProductsCount: v.number(),
taggedUsersCount: v.number(),
isLiked: v.optional(v.boolean()),
isViewed: v.optional(v.boolean())})])),
userId: v.number(),
storyId: v.number()}),v.metadata({[modelSymbol]: 'StoryLikesEntity',
user: 'UserEntity',
story: 'StoryEntity'}));
export default CreateStoryLikesSchema;


export type TCreateStoryLikesSchemaInput = v.InferInput<typeof CreateStoryLikesSchema>;
export type TCreateStoryLikesSchemaOutput = v.InferOutput<typeof CreateStoryLikesSchema>;
