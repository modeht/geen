import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadPostRelationsSchema, { ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema';
import ReadNotificationRelationsSchema, {
	ReadNotificationRelations,
} from '../../notifications/generated-schemas/read-notification-relations.schema';
import ReadMessageRelationsSchema, {
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';

export class ReadCommentRelations {
	commentor?: ReadUserRelations | string | boolean;
	post?: ReadPostRelations | string | boolean;
	notifications?: ReadNotificationRelations | string | boolean;
	messages?: ReadMessageRelations | string | boolean;
}

const ReadCommentRelationsSchema: v.GenericSchema<ReadCommentRelations> = v.object({
	commentor: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	post: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPostRelationsSchema),
		]),
	),
	notifications: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadNotificationRelationsSchema),
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

export default ReadCommentRelationsSchema;

export type TReadCommentRelationsSchemaOutput = v.InferOutput<typeof ReadCommentRelationsSchema>;
export type TReadCommentRelationsSchemaInput = v.InferInput<typeof ReadCommentRelationsSchema>;
