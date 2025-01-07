import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadWalletLogRelationsSchema, { ReadWalletLogRelations } from './read-wallet-log-relations.schema';

export class ReadWalletRelations {
	user?: ReadUserRelations | string | boolean;
	logs?: ReadWalletLogRelations | string | boolean;
}

const ReadWalletRelationsSchema: v.GenericSchema<ReadWalletRelations> = v.object({
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
	logs: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadWalletLogRelationsSchema),
		]),
	),
});

export default ReadWalletRelationsSchema;

export type TReadWalletRelationsSchemaOutput = v.InferOutput<typeof ReadWalletRelationsSchema>;
export type TReadWalletRelationsSchemaInput = v.InferInput<typeof ReadWalletRelationsSchema>;
