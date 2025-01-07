import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import { NotificationTypeEnum } from '../entities/notification.entity';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';

export class ReadNotificationFiltersSchemaFilters {
	content?: GenericComparable<'string'> | null;
	media?: ReadMediaFiltersSchemaFilters | null;
	user?: ReadUserFiltersSchemaFilters | null;
	type?: NotificationTypeEnum | null;
	isSeen?: GenericComparable<'bool'> | null;
}

const ReadNotificationFiltersSchema: v.GenericSchema<ReadNotificationFiltersSchemaFilters> = v.object({
	content: v.nullish(comparable('string')),
	media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
	user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	type: v.nullish(v.enum(NotificationTypeEnum)),
	isSeen: v.nullish(comparable('bool')),
});

export default ReadNotificationFiltersSchema;

export type TReadNotificationFiltersSchemaOutput = v.InferOutput<typeof ReadNotificationFiltersSchema>;
export type TReadNotificationFiltersSchemaInput = v.InferInput<typeof ReadNotificationFiltersSchema>;
