import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';

export class ReadFeedbackRelations {
	user?: ReadUserRelations | string | boolean;
}

const ReadFeedbackRelationsSchema: v.GenericSchema<ReadFeedbackRelations> = v.object({
	user: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
});

export default ReadFeedbackRelationsSchema;

export type TReadFeedbackRelationsSchemaOutput = v.InferOutput<typeof ReadFeedbackRelationsSchema>;
export type TReadFeedbackRelationsSchemaInput = v.InferInput<typeof ReadFeedbackRelationsSchema>;
