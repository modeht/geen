import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadMessageRelationsSchema, {
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';

export class ReadConversationRelations {
	initiator?: ReadUserRelations | string | boolean;
	target?: ReadUserRelations | string | boolean;
	messages?: ReadMessageRelations | string | boolean;
}

const ReadConversationRelationsSchema: v.GenericSchema<ReadConversationRelations> = v.object({
	initiator: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	target: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	messages: v.optional(
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

export default ReadConversationRelationsSchema;

export type TReadConversationRelationsSchemaOutput = v.InferOutput<typeof ReadConversationRelationsSchema>;
export type TReadConversationRelationsSchemaInput = v.InferInput<typeof ReadConversationRelationsSchema>;
