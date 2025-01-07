import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from './read-user-relations.schema';
import ReadCategoryRelationsSchema, {
	ReadCategoryRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';

export class ReadUserInterestRelations {
	user?: ReadUserRelations | string | boolean;
	category?: ReadCategoryRelations | string | boolean;
}

const ReadUserInterestRelationsSchema: v.GenericSchema<ReadUserInterestRelations> = v.object({
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
	category: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
		]),
	),
});

export default ReadUserInterestRelationsSchema;

export type TReadUserInterestRelationsSchemaOutput = v.InferOutput<typeof ReadUserInterestRelationsSchema>;
export type TReadUserInterestRelationsSchemaInput = v.InferInput<typeof ReadUserInterestRelationsSchema>;
