import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUserInterestOrdersSchema, {
	ReadUserInterestOrders,
} from '../../users/generated-schemas/read-user-interest-orders.schema';
import ReadBannerOrdersSchema, { ReadBannerOrders } from '../../banners/generated-schemas/read-banner-orders.schema';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadTranslationOrdersSchema, {
	ReadTranslationOrders,
} from '../../translations/generated-schemas/read-translation-orders.schema';
import ReadCategoryFilterOrdersSchema, {
	ReadCategoryFilterOrders,
} from '../../category-fitlers/generated-schemas/read-category-filter-orders.schema';
import ReadAdOrdersSchema, { ReadAdOrders } from '../../ads/generated-schemas/read-ad-orders.schema';

export class ReadCategoryOrders {
	name?: OrderDirectionEnum;
	interestedIn?: ReadUserInterestOrders | OrderDirectionEnum;
	banners?: ReadBannerOrders | OrderDirectionEnum;
	icon?: ReadMediaOrders | OrderDirectionEnum;
	translations?: ReadTranslationOrders | OrderDirectionEnum;
	filters?: ReadCategoryFilterOrders | OrderDirectionEnum;
	ads?: ReadAdOrders | OrderDirectionEnum;
	filter?: ReadCategoryFilterOrders | OrderDirectionEnum;
	visible?: OrderDirectionEnum;
	isArchived?: OrderDirectionEnum;
	index?: OrderDirectionEnum;
}

const ReadCategoryOrdersSchema: v.GenericSchema<ReadCategoryOrders> = v.object({
	name: v.optional(OrderDirectionSchema),
	interestedIn: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserInterestOrdersSchema)])),
	banners: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBannerOrdersSchema)])),
	icon: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	translations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTranslationOrdersSchema)])),
	filters: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryFilterOrdersSchema)])),
	ads: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAdOrdersSchema)])),
	filter: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryFilterOrdersSchema)])),
	visible: v.optional(OrderDirectionSchema),
	isArchived: v.optional(OrderDirectionSchema),
	index: v.optional(OrderDirectionSchema),
});

export default ReadCategoryOrdersSchema;

export type TReadCategoryOrdersSchemaOutput = v.InferOutput<typeof ReadCategoryOrdersSchema>;
export type TReadCategoryOrdersSchemaInput = v.InferInput<typeof ReadCategoryOrdersSchema>;
