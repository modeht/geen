import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersRelationsSchema, {
	ReadUsersRelations,
} from '../../users-feature/generated-schemas/read-users-relations.schema';

export class ReadOrdersRelations {
	user_id?: ReadUsersRelations | string | boolean;
}

const ReadOrdersRelationsSchema: v.GenericSchema<ReadOrdersRelations> = v.object({
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

export default ReadOrdersRelationsSchema;

export type TReadOrdersRelationsSchemaOutput = v.InferOutput<typeof ReadOrdersRelationsSchema>;
export type TReadOrdersRelationsSchemaInput = v.InferInput<typeof ReadOrdersRelationsSchema>;
