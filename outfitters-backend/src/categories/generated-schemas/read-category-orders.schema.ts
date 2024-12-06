import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadProductOrdersSchema, {
	ReadProductOrders,
} from '../../products/generated-schemas/read-product-orders.schema';
import ReadBrandProfileOrdersSchema, {
	ReadBrandProfileOrders,
} from '../../users/generated-schemas/read-brand-profile-orders.schema';
import ReadSeasonalPromotionOrdersSchema, {
	ReadSeasonalPromotionOrders,
} from '../../promotions/generated-schemas/read-seasonal-promotion-orders.schema';

export class ReadCategoryOrders {
	name?: OrderDirectionEnum;
	isArchived?: OrderDirectionEnum;
	media?: ReadMediaOrders | OrderDirectionEnum;
	subCategories?: ReadCategoryOrders | OrderDirectionEnum;
	superCategory?: ReadCategoryOrders | OrderDirectionEnum;
	superCategoryId?: OrderDirectionEnum;
	products?: ReadProductOrders | OrderDirectionEnum;
	categorybrandProfiles?: ReadBrandProfileOrders | OrderDirectionEnum;
	subCategoriesBrandProfiles?: ReadBrandProfileOrders | OrderDirectionEnum;
	seasonalPromotions?: ReadSeasonalPromotionOrders | OrderDirectionEnum;
}

const ReadCategoryOrdersSchema: v.GenericSchema<ReadCategoryOrders> = v.object({
	name: v.optional(OrderDirectionSchema),
	isArchived: v.optional(OrderDirectionSchema),
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	subCategories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	superCategory: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	superCategoryId: v.optional(OrderDirectionSchema),
	products: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
	categorybrandProfiles: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
	subCategoriesBrandProfiles: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
	seasonalPromotions: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadSeasonalPromotionOrdersSchema)])),
});

export default ReadCategoryOrdersSchema;

export type TReadCategoryOrdersSchemaOutput = v.InferOutput<typeof ReadCategoryOrdersSchema>;
export type TReadCategoryOrdersSchemaInput = v.InferInput<typeof ReadCategoryOrdersSchema>;
