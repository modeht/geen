import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';

export class ReadRedeemRelations {
	referrer?: ReadUserRelations | string | boolean;
	redeemer?: ReadUserRelations | string | boolean;
}

const ReadRedeemRelationsSchema: v.GenericSchema<ReadRedeemRelations> = v.object({
	referrer: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	redeemer: v.optional(
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

export default ReadRedeemRelationsSchema;

export type TReadRedeemRelationsSchemaOutput = v.InferOutput<typeof ReadRedeemRelationsSchema>;
export type TReadRedeemRelationsSchemaInput = v.InferInput<typeof ReadRedeemRelationsSchema>;
