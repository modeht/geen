import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import ReadMessageOrdersSchema, { ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'
import ReadBrandProfileOrdersSchema, { ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import ReadShopperProfileOrdersSchema, { ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import ReadNotificationOrdersSchema, { ReadNotificationOrders } from '../../notifications/generated-schemas/read-notification-orders.schema'



export class ReadCollaborationOrders {message?: ReadMessageOrders | OrderDirectionEnum;
brandProfile?: ReadBrandProfileOrders | OrderDirectionEnum;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum;
status?: CollaborationStatusEnum | null;
notifications?: ReadNotificationOrders | OrderDirectionEnum;
brandId?: OrderDirectionEnum;
shopperId?: OrderDirectionEnum}

const ReadCollaborationOrdersSchema: v.GenericSchema<ReadCollaborationOrders> = v.object({message: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
brandProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
shopperProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
status: v.nullish(v.enum(CollaborationStatusEnum)),
notifications: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
brandId: v.optional(OrderDirectionSchema),
shopperId: v.optional(OrderDirectionSchema)});

export default ReadCollaborationOrdersSchema;




export type TReadCollaborationOrdersSchemaOutput = v.InferOutput<typeof ReadCollaborationOrdersSchema>;
export type TReadCollaborationOrdersSchemaInput = v.InferInput<typeof ReadCollaborationOrdersSchema>;
