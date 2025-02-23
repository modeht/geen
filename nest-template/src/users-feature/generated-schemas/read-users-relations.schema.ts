import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadProfilesRelationsSchema, {
	ReadProfilesRelations,
} from '../../profiles-feature/generated-schemas/read-profiles-relations.schema';

export class ReadUsersRelations {
	profiles?: ReadProfilesRelations | string | boolean;
}

const ReadUsersRelationsSchema: v.GenericSchema<ReadUsersRelations> = v.object({
	profiles: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProfilesRelationsSchema),
		]),
	),
});

export default ReadUsersRelationsSchema;

export type TReadUsersRelationsSchemaOutput = v.InferOutput<typeof ReadUsersRelationsSchema>;
export type TReadUsersRelationsSchemaInput = v.InferInput<typeof ReadUsersRelationsSchema>;
