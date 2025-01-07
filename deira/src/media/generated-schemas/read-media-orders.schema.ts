import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadAdOrdersSchema, { ReadAdOrders } from '../../ads/generated-schemas/read-ad-orders.schema';
import ReadCategoryOrdersSchema, {
	ReadCategoryOrders,
} from '../../categories/generated-schemas/read-category-orders.schema';
import ReadNotificationOrdersSchema, {
	ReadNotificationOrders,
} from '../../notifications/generated-schemas/read-notification-orders.schema';
import ReadBannerOrdersSchema, { ReadBannerOrders } from '../../banners/generated-schemas/read-banner-orders.schema';
import ReadMessageOrdersSchema, {
	ReadMessageOrders,
} from '../../messages/generated-schemas/read-message-orders.schema';

export class ReadMediaOrders {
	ad?: ReadAdOrders | OrderDirectionEnum;
	categories?: ReadCategoryOrders | OrderDirectionEnum;
	notifications?: ReadNotificationOrders | OrderDirectionEnum;
	banner?: ReadBannerOrders | OrderDirectionEnum;
	messages?: ReadMessageOrders | OrderDirectionEnum;
	mimetype?: OrderDirectionEnum;
	url?: OrderDirectionEnum;
	size?: OrderDirectionEnum;
	width?: OrderDirectionEnum;
	height?: OrderDirectionEnum;
}

const ReadMediaOrdersSchema: v.GenericSchema<ReadMediaOrders> = v.object({
	ad: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAdOrdersSchema)])),
	categories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	notifications: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
	banner: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBannerOrdersSchema)])),
	messages: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
	mimetype: v.optional(OrderDirectionSchema),
	url: v.optional(OrderDirectionSchema),
	size: v.optional(OrderDirectionSchema),
	width: v.optional(OrderDirectionSchema),
	height: v.optional(OrderDirectionSchema),
});

export default ReadMediaOrdersSchema;

export type TReadMediaOrdersSchemaOutput = v.InferOutput<typeof ReadMediaOrdersSchema>;
export type TReadMediaOrdersSchemaInput = v.InferInput<typeof ReadMediaOrdersSchema>;
