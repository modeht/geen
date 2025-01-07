import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import { NotificationTypeEnum } from '../entities/notification.entity';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';

export class ReadNotificationRelations {
	media?: ReadMediaRelations | string | boolean;
	user?: ReadUserRelations | string | boolean;
	type?: NotificationTypeEnum | null;
}

const ReadNotificationRelationsSchema: v.GenericSchema<ReadNotificationRelations> = v.object({
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
	type: v.nullish(v.enum(NotificationTypeEnum)),
});

export default ReadNotificationRelationsSchema;

export type TReadNotificationRelationsSchemaOutput = v.InferOutput<typeof ReadNotificationRelationsSchema>;
export type TReadNotificationRelationsSchemaInput = v.InferInput<typeof ReadNotificationRelationsSchema>;
