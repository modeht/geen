import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadTaggedProductSchema, ReadTaggedProductSchemaFilters } from '../../products/generated-schemas/read-tagged-product.schema'
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'
import { ReadPostLikesSchema, ReadPostLikesSchemaFilters } from './read-post-likes.schema'
import { ReadCommentSchema, ReadCommentSchemaFilters } from '../../comments/generated-schemas/read-comment.schema'
import { ReadMessageSchema, ReadMessageSchemaFilters } from '../../messages/generated-schemas/read-message.schema'
import { ReadSavedCollectionItemSchema, ReadSavedCollectionItemSchemaFilters } from '../../saved-collections/generated-schemas/read-saved-collection-item.schema'

export class ReadPostSchemaFilters {caption?: GenericComparable<"string"> | null | undefined;
media?: ReadMediaSchemaFilters | null | undefined;
thumbnail?: ReadMediaSchemaFilters | null | undefined;
taggedProducts?: ReadTaggedProductSchemaFilters | null | undefined;
postedBy?: ReadUserSchemaFilters | null | undefined;
postedById?: GenericComparable<"number"> | null | undefined;
taggedUsers?: ReadUserSchemaFilters | null | undefined;
likedByUsers?: ReadPostLikesSchemaFilters | null | undefined;
comments?: ReadCommentSchemaFilters | null | undefined;
shares?: ReadMessageSchemaFilters | null | undefined;
savedInCollections?: ReadSavedCollectionItemSchemaFilters | null | undefined;
thumbnailId?: GenericComparable<"number"> | null | undefined;
likesCount?: GenericComparable<"number"> | null | undefined;
commentsCount?: GenericComparable<"number"> | null | undefined;
taggedProductsCount?: GenericComparable<"number"> | null | undefined;
taggedUsersCount?: GenericComparable<"number"> | null | undefined;
isLiked?: GenericComparable<"bool"> | null | undefined}

export const ReadPostSchema: v.GenericSchema<ReadPostSchemaFilters> = v.object({caption: v.nullish(comparable("string")),
media: v.nullish(v.lazy(() => ReadMediaSchema)),
thumbnail: v.nullish(v.lazy(() => ReadMediaSchema)),
taggedProducts: v.nullish(v.lazy(() => ReadTaggedProductSchema)),
postedBy: v.nullish(v.lazy(() => ReadUserSchema)),
postedById: v.nullish(comparable("number")),
taggedUsers: v.nullish(v.lazy(() => ReadUserSchema)),
likedByUsers: v.nullish(v.lazy(() => ReadPostLikesSchema)),
comments: v.nullish(v.lazy(() => ReadCommentSchema)),
shares: v.nullish(v.lazy(() => ReadMessageSchema)),
savedInCollections: v.nullish(v.lazy(() => ReadSavedCollectionItemSchema)),
thumbnailId: v.nullish(comparable("number")),
likesCount: v.nullish(comparable("number")),
commentsCount: v.nullish(comparable("number")),
taggedProductsCount: v.nullish(comparable("number")),
taggedUsersCount: v.nullish(comparable("number")),
isLiked: v.nullish(comparable("bool"))})



export type TReadPostSchema = v.InferOutput<typeof ReadPostSchema>
export type TReadPostSchemaInput = v.InferInput<typeof ReadPostSchema>
