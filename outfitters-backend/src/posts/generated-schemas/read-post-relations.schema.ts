import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelations } from '../../products/generated-schemas/read-tagged-product-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadPostLikesRelationsSchema, ReadPostLikesRelations } from './read-post-likes-relations.schema'
import { ReadCommentRelationsSchema, ReadCommentRelations } from '../../comments/generated-schemas/read-comment-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadSavedCollectionItemRelationsSchema, ReadSavedCollectionItemRelations } from '../../saved-collections/generated-schemas/read-saved-collection-item-relations.schema'



export class ReadPostRelations {media?: ReadMediaRelations | string | boolean | undefined;
thumbnail?: ReadMediaRelations | string | boolean | undefined;
taggedProducts?: ReadTaggedProductRelations | string | boolean | undefined;
postedBy?: ReadUserRelations | string | boolean | undefined;
taggedUsers?: ReadUserRelations | string | boolean | undefined;
likedByUsers?: ReadPostLikesRelations | string | boolean | undefined;
comments?: ReadCommentRelations | string | boolean | undefined;
shares?: ReadMessageRelations | string | boolean | undefined;
savedInCollections?: ReadSavedCollectionItemRelations | string | boolean | undefined}

export const ReadPostRelationsSchema: v.GenericSchema<ReadPostRelations> = v.object({media: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
thumbnail: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
taggedProducts: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadTaggedProductRelationsSchema)])),
postedBy: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
taggedUsers: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
likedByUsers: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostLikesRelationsSchema)])),
comments: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCommentRelationsSchema)])),
shares: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)])),
savedInCollections: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadSavedCollectionItemRelationsSchema)]))})



export type TReadPostRelationsSchemaOutput = v.InferOutput<typeof ReadPostRelationsSchema>;
export type TReadPostRelationsSchemaInput = v.InferInput<typeof ReadPostRelationsSchema>;
