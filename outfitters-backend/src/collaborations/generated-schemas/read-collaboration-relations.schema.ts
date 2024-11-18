import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadNotificationRelationsSchema, ReadNotificationRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'



export class ReadCollaborationRelations {message?: ReadMessageRelations | boolean | null | undefined;
brandProfile?: ReadBrandProfileRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelations | boolean | null | undefined;
status?: CollaborationStatusEnum | null | undefined;
notifications?: ReadNotificationRelations | boolean | null | undefined}

export const ReadCollaborationRelationsSchema: v.GenericSchema<ReadCollaborationRelations> = v.object({message: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)])),
brandProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
status: v.nullish(v.enum(CollaborationStatusEnum)),
notifications: v.nullish(v.union([v.boolean(), v.lazy(() => ReadNotificationRelationsSchema)]))})



export type TReadCollaborationRelationsSchemaOutput = v.InferOutput<typeof ReadCollaborationRelationsSchema>;
export type TReadCollaborationRelationsSchemaInput = v.InferInput<typeof ReadCollaborationRelationsSchema>;
