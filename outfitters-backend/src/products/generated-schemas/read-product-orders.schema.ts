import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadProductVariantOrdersSchema, { ReadProductVariantOrders } from './read-product-variant-orders.schema';
import ReadProductOptionOrdersSchema, { ReadProductOptionOrders } from './read-product-option-orders.schema';
import ReadProductReviewOrdersSchema, { ReadProductReviewOrders } from './read-product-review-orders.schema';
import ReadTaggedProductOrdersSchema, { ReadTaggedProductOrders } from './read-tagged-product-orders.schema';
import ReadAffiliationLinkOrdersSchema, {
	ReadAffiliationLinkOrders,
} from '../../affiliation-links/generated-schemas/read-affiliation-link-orders.schema';
import ReadNotificationOrdersSchema, {
	ReadNotificationOrders,
} from '../../notifications/generated-schemas/read-notification-orders.schema';
import ReadOrderItemOrdersSchema, {
	ReadOrderItemOrders,
} from '../../orders/generated-schemas/read-order-item-orders.schema';
import ReadMessageOrdersSchema, {
	ReadMessageOrders,
} from '../../messages/generated-schemas/read-message-orders.schema';
import ReadBrandProfileOrdersSchema, {
	ReadBrandProfileOrders,
} from '../../users/generated-schemas/read-brand-profile-orders.schema';
import ReadCategoryOrdersSchema, {
	ReadCategoryOrders,
} from '../../categories/generated-schemas/read-category-orders.schema';
import ReadCollectionOrdersSchema, {
	ReadCollectionOrders,
} from '../../collections/generated-schemas/read-collection-orders.schema';
import ReadCartItemsOrdersSchema, {
	ReadCartItemsOrders,
} from '../../carts/generated-schemas/read-cart-items-orders.schema';
import ReadPromotionOrdersSchema, {
	ReadPromotionOrders,
} from '../../promotions/generated-schemas/read-promotion-orders.schema';
import ReadPromoCodeOrdersSchema, {
	ReadPromoCodeOrders,
} from '../../promotions/generated-schemas/read-promo-code-orders.schema';
import ReadSavedCollectionItemOrdersSchema, {
	ReadSavedCollectionItemOrders,
} from '../../saved-collections/generated-schemas/read-saved-collection-item-orders.schema';

export class ReadProductOrders {
	isArchived?: OrderDirectionEnum;
	title?: OrderDirectionEnum;
	description?: OrderDirectionEnum;
	basePrice?: OrderDirectionEnum;
	sku?: OrderDirectionEnum;
	currency?: OrderDirectionEnum;
	stock?: OrderDirectionEnum;
	lastStockUpdate?: OrderDirectionEnum;
	isOutOfStock?: OrderDirectionEnum;
	isFeatured?: OrderDirectionEnum;
	deliveryEstimationInDays?: OrderDirectionEnum;
	media?: ReadMediaOrders | OrderDirectionEnum;
	variants?: ReadProductVariantOrders | OrderDirectionEnum;
	options?: ReadProductOptionOrders | OrderDirectionEnum;
	ratings?: ReadProductReviewOrders | OrderDirectionEnum;
	taggedIn?: ReadTaggedProductOrders | OrderDirectionEnum;
	affiliationLinks?: ReadAffiliationLinkOrders | OrderDirectionEnum;
	notifications?: ReadNotificationOrders | OrderDirectionEnum;
	orderItems?: ReadOrderItemOrders | OrderDirectionEnum;
	messages?: ReadMessageOrders | OrderDirectionEnum;
	brand?: ReadBrandProfileOrders | OrderDirectionEnum;
	category?: ReadCategoryOrders | OrderDirectionEnum;
	subCategory?: ReadCategoryOrders | OrderDirectionEnum;
	collections?: ReadCollectionOrders | OrderDirectionEnum;
	carts?: ReadCartItemsOrders | OrderDirectionEnum;
	promotions?: ReadPromotionOrders | OrderDirectionEnum;
	promoCodes?: ReadPromoCodeOrders | OrderDirectionEnum;
	savedInCollections?: ReadSavedCollectionItemOrders | OrderDirectionEnum;
	brandId?: OrderDirectionEnum;
	categoryId?: OrderDirectionEnum;
	subCategoryId?: OrderDirectionEnum;
	averageRating?: OrderDirectionEnum;
	isSaved?: OrderDirectionEnum;
}

const ReadProductOrdersSchema: v.GenericSchema<ReadProductOrders> = v.object({
	isArchived: v.optional(OrderDirectionSchema),
	title: v.optional(OrderDirectionSchema),
	description: v.optional(OrderDirectionSchema),
	basePrice: v.optional(OrderDirectionSchema),
	sku: v.optional(OrderDirectionSchema),
	currency: v.optional(OrderDirectionSchema),
	stock: v.optional(OrderDirectionSchema),
	lastStockUpdate: v.optional(OrderDirectionSchema),
	isOutOfStock: v.optional(OrderDirectionSchema),
	isFeatured: v.optional(OrderDirectionSchema),
	deliveryEstimationInDays: v.optional(OrderDirectionSchema),
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	variants: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)])),
	options: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOptionOrdersSchema)])),
	ratings: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductReviewOrdersSchema)])),
	taggedIn: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTaggedProductOrdersSchema)])),
	affiliationLinks: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
	notifications: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
	orderItems: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
	messages: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
	brand: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
	category: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	subCategory: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	collections: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCollectionOrdersSchema)])),
	carts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCartItemsOrdersSchema)])),
	promotions: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)])),
	promoCodes: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
	savedInCollections: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionItemOrdersSchema)])),
	brandId: v.optional(OrderDirectionSchema),
	categoryId: v.optional(OrderDirectionSchema),
	subCategoryId: v.optional(OrderDirectionSchema),
	averageRating: v.optional(OrderDirectionSchema),
	isSaved: v.optional(OrderDirectionSchema),
});

export default ReadProductOrdersSchema;

export type TReadProductOrdersSchemaOutput = v.InferOutput<typeof ReadProductOrdersSchema>;
export type TReadProductOrdersSchemaInput = v.InferInput<typeof ReadProductOrdersSchema>;
