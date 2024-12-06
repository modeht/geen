import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import ReadMessageRelationsSchema, {
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';
import ReadBrandProfileRelationsSchema, {
	ReadBrandProfileRelations,
} from '../../users/generated-schemas/read-brand-profile-relations.schema';
import ReadShopperProfileRelationsSchema, {
	ReadShopperProfileRelations,
} from '../../users/generated-schemas/read-shopper-profile-relations.schema';
import ReadNotificationRelationsSchema, {
	ReadNotificationRelations,
} from '../../notifications/generated-schemas/read-notification-relations.schema';

export class ReadCollaborationRelations {
	message?: ReadMessageRelations | string | boolean;
	brandProfile?: ReadBrandProfileRelations | string | boolean;
	shopperProfile?: ReadShopperProfileRelations | string | boolean;
	status?: CollaborationStatusEnum | null;
	notifications?: ReadNotificationRelations | string | boolean;
}

const ReadCollaborationRelationsSchema: v.GenericSchema<ReadCollaborationRelations> = v.object({
	message: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMessageRelationsSchema),
		]),
	),
	brandProfile: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBrandProfileRelationsSchema),
		]),
	),
	shopperProfile: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadShopperProfileRelationsSchema),
		]),
	),
	status: v.nullish(v.enum(CollaborationStatusEnum)),
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
});

export default ReadCollaborationRelationsSchema;

export type TReadCollaborationRelationsSchemaOutput = v.InferOutput<typeof ReadCollaborationRelationsSchema>;
export type TReadCollaborationRelationsSchemaInput = v.InferInput<typeof ReadCollaborationRelationsSchema>;
