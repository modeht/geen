import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelations } from '../../products/generated-schemas/read-tagged-product-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadStoryLikesRelationsSchema, ReadStoryLikesRelations } from './read-story-likes-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'



export class ReadStoryRelations {media?: ReadMediaRelations | string | boolean | undefined;
taggedProducts?: ReadTaggedProductRelations | string | boolean | undefined;
postedBy?: ReadUserRelations | string | boolean | undefined;
taggedUsers?: ReadUserRelations | string | boolean | undefined;
likedByUsers?: ReadStoryLikesRelations | string | boolean | undefined;
shares?: ReadMessageRelations | string | boolean | undefined}

export const ReadStoryRelationsSchema: v.GenericSchema<ReadStoryRelations> = v.object({media: v.undefinedable(v.union([v.pipe(
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
					v.boolean(),), v.lazy(() => ReadStoryLikesRelationsSchema)])),
shares: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)]))})



export type TReadStoryRelationsSchemaOutput = v.InferOutput<typeof ReadStoryRelationsSchema>;
export type TReadStoryRelationsSchemaInput = v.InferInput<typeof ReadStoryRelationsSchema>;
