import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';

export class ReadRatingRelations {
	reviewer?: ReadUserRelations | string | boolean;
	reviewed?: ReadUserRelations | string | boolean;
}

const ReadRatingRelationsSchema: v.GenericSchema<ReadRatingRelations> = v.object({
	reviewer: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	reviewed: v.optional(
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

export default ReadRatingRelationsSchema;

export type TReadRatingRelationsSchemaOutput = v.InferOutput<typeof ReadRatingRelationsSchema>;
export type TReadRatingRelationsSchemaInput = v.InferInput<typeof ReadRatingRelationsSchema>;
