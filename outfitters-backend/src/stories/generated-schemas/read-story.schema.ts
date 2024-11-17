import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadTaggedProductSchema, ReadTaggedProductSchemaFilters } from '../../products/generated-schemas/read-tagged-product.schema'
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'
import { ReadStoryLikesSchema, ReadStoryLikesSchemaFilters } from './read-story-likes.schema'
import { ReadMessageSchema, ReadMessageSchemaFilters } from '../../messages/generated-schemas/read-message.schema'

export class ReadStorySchemaFilters {background?: GenericComparable<"string"> | null | undefined;
text?: GenericComparable<"string"> | null | undefined;
media?: ReadMediaSchemaFilters | null | undefined;
taggedProducts?: ReadTaggedProductSchemaFilters | null | undefined;
postedBy?: ReadUserSchemaFilters | null | undefined;
taggedUsers?: ReadUserSchemaFilters | null | undefined;
likedByUsers?: ReadStoryLikesSchemaFilters | null | undefined;
shares?: ReadMessageSchemaFilters | null | undefined;
postedById?: GenericComparable<"number"> | null | undefined;
taggedProductsCount?: GenericComparable<"number"> | null | undefined;
taggedUsersCount?: GenericComparable<"number"> | null | undefined;
isLiked?: GenericComparable<"bool"> | null | undefined;
isViewed?: GenericComparable<"bool"> | null | undefined}

export const ReadStorySchema: v.GenericSchema<ReadStorySchemaFilters> = v.object({background: v.nullish(comparable("string")),
text: v.nullish(comparable("string")),
media: v.nullish(v.lazy(() => ReadMediaSchema)),
taggedProducts: v.nullish(v.lazy(() => ReadTaggedProductSchema)),
postedBy: v.nullish(v.lazy(() => ReadUserSchema)),
taggedUsers: v.nullish(v.lazy(() => ReadUserSchema)),
likedByUsers: v.nullish(v.lazy(() => ReadStoryLikesSchema)),
shares: v.nullish(v.lazy(() => ReadMessageSchema)),
postedById: v.nullish(comparable("number")),
taggedProductsCount: v.nullish(comparable("number")),
taggedUsersCount: v.nullish(comparable("number")),
isLiked: v.nullish(comparable("bool")),
isViewed: v.nullish(comparable("bool"))})



export type TReadStorySchema = v.InferOutput<typeof ReadStorySchema>
export type TReadStorySchemaInput = v.InferInput<typeof ReadStorySchema>
