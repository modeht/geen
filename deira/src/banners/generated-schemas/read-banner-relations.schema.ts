import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadCategoryRelationsSchema, {
	ReadCategoryRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';

export class ReadBannerRelations {
	category?: ReadCategoryRelations | string | boolean;
	createdBy?: ReadUserRelations | string | boolean;
	createdFor?: ReadUserRelations | string | boolean;
	media?: ReadMediaRelations | string | boolean;
}

const ReadBannerRelationsSchema: v.GenericSchema<ReadBannerRelations> = v.object({
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
	createdBy: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	createdFor: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	media: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
		]),
	),
});

export default ReadBannerRelationsSchema;

export type TReadBannerRelationsSchemaOutput = v.InferOutput<typeof ReadBannerRelationsSchema>;
export type TReadBannerRelationsSchemaInput = v.InferInput<typeof ReadBannerRelationsSchema>;
