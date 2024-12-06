import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import ReadMessageFiltersSchema, {
	ReadMessageFiltersSchemaFilters,
} from '../../messages/generated-schemas/read-message-filters.schema';
import ReadBrandProfileFiltersSchema, {
	ReadBrandProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-brand-profile-filters.schema';
import ReadShopperProfileFiltersSchema, {
	ReadShopperProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-shopper-profile-filters.schema';
import ReadNotificationFiltersSchema, {
	ReadNotificationFiltersSchemaFilters,
} from '../../notifications/generated-schemas/read-notification-filters.schema';

export class ReadCollaborationFiltersSchemaFilters {
	message?: ReadMessageFiltersSchemaFilters | null;
	brandProfile?: ReadBrandProfileFiltersSchemaFilters | null;
	shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null;
	status?: CollaborationStatusEnum | null;
	notifications?: ReadNotificationFiltersSchemaFilters | null;
	brandId?: GenericComparable<'number'> | null;
	shopperId?: GenericComparable<'number'> | null;
}

const ReadCollaborationFiltersSchema: v.GenericSchema<ReadCollaborationFiltersSchemaFilters> = v.object({
	message: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
	brandProfile: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
	shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
	status: v.nullish(v.enum(CollaborationStatusEnum)),
	notifications: v.nullish(v.lazy(() => ReadNotificationFiltersSchema)),
	brandId: v.nullish(comparable('number')),
	shopperId: v.nullish(comparable('number')),
});

export default ReadCollaborationFiltersSchema;

export type TReadCollaborationFiltersSchemaOutput = v.InferOutput<typeof ReadCollaborationFiltersSchema>;
export type TReadCollaborationFiltersSchemaInput = v.InferInput<typeof ReadCollaborationFiltersSchema>;
