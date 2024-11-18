import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelations } from '../../products/generated-schemas/read-tagged-product-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadStoryLikesRelationsSchema, ReadStoryLikesRelations } from './read-story-likes-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'



export class ReadStoryRelations {media?: ReadMediaRelations | boolean | null | undefined;
taggedProducts?: ReadTaggedProductRelations | boolean | null | undefined;
postedBy?: ReadUserRelations | boolean | null | undefined;
taggedUsers?: ReadUserRelations | boolean | null | undefined;
likedByUsers?: ReadStoryLikesRelations | boolean | null | undefined;
shares?: ReadMessageRelations | boolean | null | undefined}

export const ReadStoryRelationsSchema: v.GenericSchema<ReadStoryRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
taggedProducts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadTaggedProductRelationsSchema)])),
postedBy: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
taggedUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
likedByUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryLikesRelationsSchema)])),
shares: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)]))})



export type TReadStoryRelationsSchemaOutput = v.InferOutput<typeof ReadStoryRelationsSchema>;
export type TReadStoryRelationsSchemaInput = v.InferInput<typeof ReadStoryRelationsSchema>;
