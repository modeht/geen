import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import { PaymentStatusEnum } from '../entities/ad.entity';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';
import ReadMessageOrdersSchema, {
	ReadMessageOrders,
} from '../../messages/generated-schemas/read-message-orders.schema';
import ReadGovernorateOrdersSchema, {
	ReadGovernorateOrders,
} from '../../governorate/generated-schemas/read-governorate-orders.schema';
import ReadPlanOrdersSchema, { ReadPlanOrders } from '../../plans/generated-schemas/read-plan-orders.schema';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadCategoryOrdersSchema, {
	ReadCategoryOrders,
} from '../../categories/generated-schemas/read-category-orders.schema';
import ReadCategoryFilterOrdersSchema, {
	ReadCategoryFilterOrders,
} from '../../category-fitlers/generated-schemas/read-category-filter-orders.schema';
import ReadFavoriteOrdersSchema, {
	ReadFavoriteOrders,
} from '../../favorites/generated-schemas/read-favorite-orders.schema';

export class ReadAdOrders {
	user?: ReadUserOrders | OrderDirectionEnum;
	messages?: ReadMessageOrders | OrderDirectionEnum;
	governorates?: ReadGovernorateOrders | OrderDirectionEnum;
	plan?: ReadPlanOrders | OrderDirectionEnum;
	start?: OrderDirectionEnum;
	end?: OrderDirectionEnum;
	media?: ReadMediaOrders | OrderDirectionEnum;
	categories?: ReadCategoryOrders | OrderDirectionEnum;
	filters?: ReadCategoryFilterOrders | OrderDirectionEnum;
	price?: OrderDirectionEnum;
	enableWhatsapp?: OrderDirectionEnum;
	enablePhone?: OrderDirectionEnum;
	paymentStatus?: PaymentStatusEnum | null;
	title?: OrderDirectionEnum;
	description?: OrderDirectionEnum;
	fans?: ReadFavoriteOrders | OrderDirectionEnum;
	isBlocked?: OrderDirectionEnum;
	viewsCount?: OrderDirectionEnum;
}

const ReadAdOrdersSchema: v.GenericSchema<ReadAdOrders> = v.object({
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	messages: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
	governorates: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadGovernorateOrdersSchema)])),
	plan: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPlanOrdersSchema)])),
	start: v.optional(OrderDirectionSchema),
	end: v.optional(OrderDirectionSchema),
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	categories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	filters: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryFilterOrdersSchema)])),
	price: v.optional(OrderDirectionSchema),
	enableWhatsapp: v.optional(OrderDirectionSchema),
	enablePhone: v.optional(OrderDirectionSchema),
	paymentStatus: v.nullish(v.enum(PaymentStatusEnum)),
	title: v.optional(OrderDirectionSchema),
	description: v.optional(OrderDirectionSchema),
	fans: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadFavoriteOrdersSchema)])),
	isBlocked: v.optional(OrderDirectionSchema),
	viewsCount: v.optional(OrderDirectionSchema),
});

export default ReadAdOrdersSchema;

export type TReadAdOrdersSchemaOutput = v.InferOutput<typeof ReadAdOrdersSchema>;
export type TReadAdOrdersSchemaInput = v.InferInput<typeof ReadAdOrdersSchema>;
