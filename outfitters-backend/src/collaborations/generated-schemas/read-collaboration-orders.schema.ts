import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import { ReadMessageOrdersSchema, ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import { ReadShopperProfileOrdersSchema, ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import { ReadNotificationOrdersSchema, ReadNotificationOrders } from '../../notifications/generated-schemas/read-notification-orders.schema'



export class ReadCollaborationOrders {message?: ReadMessageOrders | OrderDirectionEnum | undefined;
brandProfile?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
status?: CollaborationStatusEnum | null | undefined;
notifications?: ReadNotificationOrders | OrderDirectionEnum | undefined}

export const ReadCollaborationOrdersSchema: v.GenericSchema<ReadCollaborationOrders> = v.object({message: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
brandProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
status: v.nullish(v.enum(CollaborationStatusEnum)),
notifications: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)]))})



export type TReadCollaborationOrdersSchemaOutput = v.InferOutput<typeof ReadCollaborationOrdersSchema>;
export type TReadCollaborationOrdersSchemaInput = v.InferInput<typeof ReadCollaborationOrdersSchema>;
