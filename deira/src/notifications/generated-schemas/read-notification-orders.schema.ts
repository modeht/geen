import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import { NotificationTypeEnum } from '../entities/notification.entity';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';

export class ReadNotificationOrders {
	content?: OrderDirectionEnum;
	media?: ReadMediaOrders | OrderDirectionEnum;
	user?: ReadUserOrders | OrderDirectionEnum;
	type?: NotificationTypeEnum | null;
	isSeen?: OrderDirectionEnum;
}

const ReadNotificationOrdersSchema: v.GenericSchema<ReadNotificationOrders> = v.object({
	content: v.optional(OrderDirectionSchema),
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	type: v.nullish(v.enum(NotificationTypeEnum)),
	isSeen: v.optional(OrderDirectionSchema),
});

export default ReadNotificationOrdersSchema;

export type TReadNotificationOrdersSchemaOutput = v.InferOutput<typeof ReadNotificationOrdersSchema>;
export type TReadNotificationOrdersSchemaInput = v.InferInput<typeof ReadNotificationOrdersSchema>;
