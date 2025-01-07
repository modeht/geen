import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadAdRelationsSchema, { ReadAdRelations } from '../../ads/generated-schemas/read-ad-relations.schema';
import ReadCategoryRelationsSchema, {
	ReadCategoryRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';
import ReadNotificationRelationsSchema, {
	ReadNotificationRelations,
} from '../../notifications/generated-schemas/read-notification-relations.schema';
import ReadBannerRelationsSchema, {
	ReadBannerRelations,
} from '../../banners/generated-schemas/read-banner-relations.schema';
import ReadMessageRelationsSchema, {
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';

export class ReadMediaRelations {
	ad?: ReadAdRelations | string | boolean;
	categories?: ReadCategoryRelations | string | boolean;
	notifications?: ReadNotificationRelations | string | boolean;
	banner?: ReadBannerRelations | string | boolean;
	messages?: ReadMessageRelations | string | boolean;
}

const ReadMediaRelationsSchema: v.GenericSchema<ReadMediaRelations> = v.object({
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
	categories: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
		]),
	),
	notifications: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadNotificationRelationsSchema),
		]),
	),
	banner: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBannerRelationsSchema),
		]),
	),
	messages: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMessageRelationsSchema),
		]),
	),
});

export default ReadMediaRelationsSchema;

export type TReadMediaRelationsSchemaOutput = v.InferOutput<typeof ReadMediaRelationsSchema>;
export type TReadMediaRelationsSchemaInput = v.InferInput<typeof ReadMediaRelationsSchema>;
