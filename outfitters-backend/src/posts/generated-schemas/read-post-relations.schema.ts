import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import ReadTaggedProductRelationsSchema, {
	ReadTaggedProductRelations,
} from '../../products/generated-schemas/read-tagged-product-relations.schema';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadPostLikesRelationsSchema, { ReadPostLikesRelations } from './read-post-likes-relations.schema';
import ReadCommentRelationsSchema, {
	ReadCommentRelations,
} from '../../comments/generated-schemas/read-comment-relations.schema';
import ReadMessageRelationsSchema, {
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';
import ReadSavedCollectionItemRelationsSchema, {
	ReadSavedCollectionItemRelations,
} from '../../saved-collections/generated-schemas/read-saved-collection-item-relations.schema';

export class ReadPostRelations {
	media?: ReadMediaRelations | string | boolean;
	thumbnail?: ReadMediaRelations | string | boolean;
	taggedProducts?: ReadTaggedProductRelations | string | boolean;
	postedBy?: ReadUserRelations | string | boolean;
	taggedUsers?: ReadUserRelations | string | boolean;
	likedByUsers?: ReadPostLikesRelations | string | boolean;
	comments?: ReadCommentRelations | string | boolean;
	shares?: ReadMessageRelations | string | boolean;
	savedInCollections?: ReadSavedCollectionItemRelations | string | boolean;
}

const ReadPostRelationsSchema: v.GenericSchema<ReadPostRelations> = v.object({
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
	thumbnail: v.optional(
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
			v.lazy(() => ReadPostLikesRelationsSchema),
		]),
	),
	comments: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCommentRelationsSchema),
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
	savedInCollections: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadSavedCollectionItemRelationsSchema),
		]),
	),
});

export default ReadPostRelationsSchema;

export type TReadPostRelationsSchemaOutput = v.InferOutput<typeof ReadPostRelationsSchema>;
export type TReadPostRelationsSchemaInput = v.InferInput<typeof ReadPostRelationsSchema>;
