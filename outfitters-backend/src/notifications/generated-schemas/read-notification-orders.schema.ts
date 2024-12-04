import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { NotificationType } from '../entities/notification.entity';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadCollaborationOrdersSchema, { ReadCollaborationOrders } from '../../collaborations/generated-schemas/read-collaboration-orders.schema'
import ReadCommentOrdersSchema, { ReadCommentOrders } from '../../comments/generated-schemas/read-comment-orders.schema'
import ReadPromotionOrdersSchema, { ReadPromotionOrders } from '../../promotions/generated-schemas/read-promotion-orders.schema'
import ReadProductOrdersSchema, { ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'



export class ReadNotificationOrders {type?: NotificationType | null;
customContent?: OrderDirectionEnum;
isRead?: OrderDirectionEnum;
user?: ReadUserOrders | OrderDirectionEnum;
collaboration?: ReadCollaborationOrders | OrderDirectionEnum;
comment?: ReadCommentOrders | OrderDirectionEnum;
promotion?: ReadPromotionOrders | OrderDirectionEnum;
product?: ReadProductOrders | OrderDirectionEnum;
userId?: OrderDirectionEnum;
collaborationId?: OrderDirectionEnum;
commentId?: OrderDirectionEnum;
promotionId?: OrderDirectionEnum;
productId?: OrderDirectionEnum}

const ReadNotificationOrdersSchema: v.GenericSchema<ReadNotificationOrders> = v.object({type: v.nullish(v.enum(NotificationType)),
customContent: v.optional(OrderDirectionSchema),
isRead: v.optional(OrderDirectionSchema),
user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
collaboration: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCollaborationOrdersSchema)])),
comment: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCommentOrdersSchema)])),
promotion: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)])),
product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
userId: v.optional(OrderDirectionSchema),
collaborationId: v.optional(OrderDirectionSchema),
commentId: v.optional(OrderDirectionSchema),
promotionId: v.optional(OrderDirectionSchema),
productId: v.optional(OrderDirectionSchema)});

export default ReadNotificationOrdersSchema;




export type TReadNotificationOrdersSchemaOutput = v.InferOutput<typeof ReadNotificationOrdersSchema>;
export type TReadNotificationOrdersSchemaInput = v.InferInput<typeof ReadNotificationOrdersSchema>;
