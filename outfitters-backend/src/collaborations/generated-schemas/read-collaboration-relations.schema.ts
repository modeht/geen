import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import { ReadMessageRelationsSchema, ReadMessageRelationsSchemaRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadNotificationRelationsSchema, ReadNotificationRelationsSchemaRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'

export class ReadCollaborationRelationsSchemaRelations {message?: ReadMessageRelationsSchemaRelations | boolean | null | undefined;
brandProfile?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelationsSchemaRelations | boolean | null | undefined;
notifications?: ReadNotificationRelationsSchemaRelations | boolean | null | undefined}

export const ReadCollaborationRelationsSchema: v.GenericSchema<ReadCollaborationRelationsSchemaRelations> = v.object({message: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)])),
brandProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
notifications: v.nullish(v.union([v.boolean(), v.lazy(() => ReadNotificationRelationsSchema)]))})



export type TReadCollaborationRelationsSchemaOutput = v.InferOutput<typeof ReadCollaborationRelationsSchema>;
export type TReadCollaborationRelationsSchemaInput = v.InferInput<typeof ReadCollaborationRelationsSchema>;
