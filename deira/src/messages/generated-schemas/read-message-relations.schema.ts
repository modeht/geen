import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadConversationRelationsSchema, {
	ReadConversationRelations,
} from '../../conversations/generated-schemas/read-conversation-relations.schema';
import ReadAdRelationsSchema, { ReadAdRelations } from '../../ads/generated-schemas/read-ad-relations.schema';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';

export class ReadMessageRelations {
	sender?: ReadUserRelations | string | boolean;
	receiver?: ReadUserRelations | string | boolean;
	conversation?: ReadConversationRelations | string | boolean;
	ad?: ReadAdRelations | string | boolean;
	media?: ReadMediaRelations | string | boolean;
}

const ReadMessageRelationsSchema: v.GenericSchema<ReadMessageRelations> = v.object({
	sender: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	receiver: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	conversation: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadConversationRelationsSchema),
		]),
	),
	ad: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadAdRelationsSchema),
		]),
	),
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
});

export default ReadMessageRelationsSchema;

export type TReadMessageRelationsSchemaOutput = v.InferOutput<typeof ReadMessageRelationsSchema>;
export type TReadMessageRelationsSchemaInput = v.InferInput<typeof ReadMessageRelationsSchema>;
