import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersRelationsSchema, {
	ReadUsersRelations,
} from '../../users-feature/generated-schemas/read-users-relations.schema';

export class ReadProfilesRelations {
	user?: ReadUsersRelations | string | boolean;
}

const ReadProfilesRelationsSchema: v.GenericSchema<ReadProfilesRelations> = v.object({
	user: v.optional(
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

export default ReadProfilesRelationsSchema;

export type TReadProfilesRelationsSchemaOutput = v.InferOutput<typeof ReadProfilesRelationsSchema>;
export type TReadProfilesRelationsSchemaInput = v.InferInput<typeof ReadProfilesRelationsSchema>;
