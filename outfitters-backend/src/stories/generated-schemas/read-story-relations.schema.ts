import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelationsSchemaRelations } from '../../products/generated-schemas/read-tagged-product-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadStoryLikesRelationsSchema, ReadStoryLikesRelationsSchemaRelations } from './read-story-likes-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelationsSchemaRelations } from '../../messages/generated-schemas/read-message-relations.schema'

export class ReadStoryRelationsSchemaRelations {media?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
taggedProducts?: ReadTaggedProductRelationsSchemaRelations | boolean | null | undefined;
postedBy?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
taggedUsers?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
likedByUsers?: ReadStoryLikesRelationsSchemaRelations | boolean | null | undefined;
shares?: ReadMessageRelationsSchemaRelations | boolean | null | undefined}

export const ReadStoryRelationsSchema: v.GenericSchema<ReadStoryRelationsSchemaRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
taggedProducts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadTaggedProductRelationsSchema)])),
postedBy: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
taggedUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
likedByUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryLikesRelationsSchema)])),
shares: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)]))})



export type TReadStoryRelationsSchemaOutput = v.InferOutput<typeof ReadStoryRelationsSchema>;
export type TReadStoryRelationsSchemaInput = v.InferInput<typeof ReadStoryRelationsSchema>;
