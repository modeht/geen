import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadCategoryOrdersSchema, {
	ReadCategoryOrders,
} from '../../categories/generated-schemas/read-category-orders.schema';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';

export class ReadBannerOrders {
	category?: ReadCategoryOrders | OrderDirectionEnum;
	createdBy?: ReadUserOrders | OrderDirectionEnum;
	createdFor?: ReadUserOrders | OrderDirectionEnum;
	title?: OrderDirectionEnum;
	media?: ReadMediaOrders | OrderDirectionEnum;
	whatsapp?: OrderDirectionEnum;
	phoneNumber?: OrderDirectionEnum;
	totalViews?: OrderDirectionEnum;
	inHomePage?: OrderDirectionEnum;
	durationDays?: OrderDirectionEnum;
	start?: OrderDirectionEnum;
	end?: OrderDirectionEnum;
}

const ReadBannerOrdersSchema: v.GenericSchema<ReadBannerOrders> = v.object({
	category: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	createdBy: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	createdFor: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	title: v.optional(OrderDirectionSchema),
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	whatsapp: v.optional(OrderDirectionSchema),
	phoneNumber: v.optional(OrderDirectionSchema),
	totalViews: v.optional(OrderDirectionSchema),
	inHomePage: v.optional(OrderDirectionSchema),
	durationDays: v.optional(OrderDirectionSchema),
	start: v.optional(OrderDirectionSchema),
	end: v.optional(OrderDirectionSchema),
});

export default ReadBannerOrdersSchema;

export type TReadBannerOrdersSchemaOutput = v.InferOutput<typeof ReadBannerOrdersSchema>;
export type TReadBannerOrdersSchemaInput = v.InferInput<typeof ReadBannerOrdersSchema>;
