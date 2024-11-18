import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelationsSchemaRelations } from '../../products/generated-schemas/read-tagged-product-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadPostLikesRelationsSchema, ReadPostLikesRelationsSchemaRelations } from './read-post-likes-relations.schema'
import { ReadCommentRelationsSchema, ReadCommentRelationsSchemaRelations } from '../../comments/generated-schemas/read-comment-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelationsSchemaRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadSavedCollectionItemRelationsSchema, ReadSavedCollectionItemRelationsSchemaRelations } from '../../saved-collections/generated-schemas/read-saved-collection-item-relations.schema'

export class ReadPostRelationsSchemaRelations {media?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
thumbnail?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
taggedProducts?: ReadTaggedProductRelationsSchemaRelations | boolean | null | undefined;
postedBy?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
taggedUsers?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
likedByUsers?: ReadPostLikesRelationsSchemaRelations | boolean | null | undefined;
comments?: ReadCommentRelationsSchemaRelations | boolean | null | undefined;
shares?: ReadMessageRelationsSchemaRelations | boolean | null | undefined;
savedInCollections?: ReadSavedCollectionItemRelationsSchemaRelations | boolean | null | undefined}

export const ReadPostRelationsSchema: v.GenericSchema<ReadPostRelationsSchemaRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
thumbnail: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
taggedProducts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadTaggedProductRelationsSchema)])),
postedBy: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
taggedUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
likedByUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostLikesRelationsSchema)])),
comments: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCommentRelationsSchema)])),
shares: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)])),
savedInCollections: v.nullish(v.union([v.boolean(), v.lazy(() => ReadSavedCollectionItemRelationsSchema)]))})



export type TReadPostRelationsSchema = v.InferOutput<typeof ReadPostRelationsSchema>;

export type TReadPostRelationsSchemaInput = v.InferInput<typeof ReadPostRelationsSchema>;
