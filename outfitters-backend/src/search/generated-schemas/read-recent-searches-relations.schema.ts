import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import { searchMode } from '../entities/recent-searches.entity';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';

export class ReadRecentSearchesRelations {
	mode?: searchMode | null;
	user?: ReadUserRelations | string | boolean;
}

const ReadRecentSearchesRelationsSchema: v.GenericSchema<ReadRecentSearchesRelations> = v.object({
	mode: v.nullish(v.enum(searchMode)),
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

export default ReadRecentSearchesRelationsSchema;

export type TReadRecentSearchesRelationsSchemaOutput = v.InferOutput<typeof ReadRecentSearchesRelationsSchema>;
export type TReadRecentSearchesRelationsSchemaInput = v.InferInput<typeof ReadRecentSearchesRelationsSchema>;
