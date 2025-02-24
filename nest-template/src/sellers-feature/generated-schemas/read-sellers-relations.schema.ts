import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersRelationsSchema, {
	ReadUsersRelations,
} from '../../users-feature/generated-schemas/read-users-relations.schema';

export class ReadSellersRelations {
	user_id?: ReadUsersRelations | string | boolean;
}

const ReadSellersRelationsSchema: v.GenericSchema<ReadSellersRelations> = v.object({
	user_id: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUsersRelationsSchema),
		]),
	),
});

export default ReadSellersRelationsSchema;

export type TReadSellersRelationsSchemaOutput = v.InferOutput<typeof ReadSellersRelationsSchema>;
export type TReadSellersRelationsSchemaInput = v.InferInput<typeof ReadSellersRelationsSchema>;
