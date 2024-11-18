import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import { ReadMessageFiltersSchema, ReadMessageFiltersSchemaFilters } from '../../messages/generated-schemas/read-message-filters.schema'
import { ReadBrandProfileFiltersSchema, ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'
import { ReadShopperProfileFiltersSchema, ReadShopperProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-shopper-profile-filters.schema'
import { ReadNotificationFiltersSchema, ReadNotificationFiltersSchemaFilters } from '../../notifications/generated-schemas/read-notification-filters.schema'

export class ReadCollaborationFiltersSchemaFilters {message?: ReadMessageFiltersSchemaFilters | null | undefined;
brandProfile?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null | undefined;
notifications?: ReadNotificationFiltersSchemaFilters | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined}

export const ReadCollaborationFiltersSchema: v.GenericSchema<ReadCollaborationFiltersSchemaFilters> = v.object({message: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
brandProfile: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
notifications: v.nullish(v.lazy(() => ReadNotificationFiltersSchema)),
brandId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number"))})



export type TReadCollaborationSchemaOutput = v.InferOutput<typeof ReadCollaborationFiltersSchema>;
export type TReadCollaborationSchemaInput = v.InferInput<typeof ReadCollaborationFiltersSchema>;
