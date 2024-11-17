import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import { ReadMessageSchema, ReadMessageSchemaFilters } from '../../messages/generated-schemas/read-message.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from '../../users/generated-schemas/read-brand-profile.schema'
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from '../../users/generated-schemas/read-shopper-profile.schema'
import { ReadNotificationSchema, ReadNotificationSchemaFilters } from '../../notifications/generated-schemas/read-notification.schema'

export class ReadCollaborationSchemaFilters {message?: ReadMessageSchemaFilters | null | undefined;
brandProfile?: ReadBrandProfileSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileSchemaFilters | null | undefined;
notifications?: ReadNotificationSchemaFilters | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined}

export const ReadCollaborationSchema: v.GenericSchema<ReadCollaborationSchemaFilters> = v.object({message: v.nullish(v.lazy(() => ReadMessageSchema)),
brandProfile: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
notifications: v.nullish(v.lazy(() => ReadNotificationSchema)),
brandId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number"))})



export type TReadCollaborationSchema = v.InferOutput<typeof ReadCollaborationSchema>
export type TReadCollaborationSchemaInput = v.InferInput<typeof ReadCollaborationSchema>
