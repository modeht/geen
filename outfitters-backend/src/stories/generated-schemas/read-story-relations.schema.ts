import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import ReadTaggedProductRelationsSchema, {
	ReadTaggedProductRelations,
} from '../../products/generated-schemas/read-tagged-product-relations.schema';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadStoryLikesRelationsSchema, { ReadStoryLikesRelations } from './read-story-likes-relations.schema';
import ReadMessageRelationsSchema, {
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';

export class ReadStoryRelations {
	media?: ReadMediaRelations | string | boolean;
	taggedProducts?: ReadTaggedProductRelations | string | boolean;
	postedBy?: ReadUserRelations | string | boolean;
	taggedUsers?: ReadUserRelations | string | boolean;
	likedByUsers?: ReadStoryLikesRelations | string | boolean;
	shares?: ReadMessageRelations | string | boolean;
}

const ReadStoryRelationsSchema: v.GenericSchema<ReadStoryRelations> = v.object({
	media: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
		]),
	),
	taggedProducts: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadTaggedProductRelationsSchema),
		]),
	),
	postedBy: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	taggedUsers: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	likedByUsers: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadStoryLikesRelationsSchema),
		]),
	),
	shares: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMessageRelationsSchema),
		]),
	),
});

export default ReadStoryRelationsSchema;

export type TReadStoryRelationsSchemaOutput = v.InferOutput<typeof ReadStoryRelationsSchema>;
export type TReadStoryRelationsSchemaInput = v.InferInput<typeof ReadStoryRelationsSchema>;
