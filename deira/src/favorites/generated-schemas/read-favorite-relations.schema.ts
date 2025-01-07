import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadAdRelationsSchema, { ReadAdRelations } from '../../ads/generated-schemas/read-ad-relations.schema';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';

export class ReadFavoriteRelations {
	ad?: ReadAdRelations | string | boolean;
	user?: ReadUserRelations | string | boolean;
}

const ReadFavoriteRelationsSchema: v.GenericSchema<ReadFavoriteRelations> = v.object({
	ad: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadAdRelationsSchema),
		]),
	),
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

export default ReadFavoriteRelationsSchema;

export type TReadFavoriteRelationsSchemaOutput = v.InferOutput<typeof ReadFavoriteRelationsSchema>;
export type TReadFavoriteRelationsSchemaInput = v.InferInput<typeof ReadFavoriteRelationsSchema>;
