import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadMediaOrdersSchema, ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import { ReadProductVariantOrdersSchema, ReadProductVariantOrders } from './read-product-variant-orders.schema'
import { ReadProductOptionOrdersSchema, ReadProductOptionOrders } from './read-product-option-orders.schema'
import { ReadProductReviewOrdersSchema, ReadProductReviewOrders } from './read-product-review-orders.schema'
import { ReadTaggedProductOrdersSchema, ReadTaggedProductOrders } from './read-tagged-product-orders.schema'
import { ReadAffiliationLinkOrdersSchema, ReadAffiliationLinkOrders } from '../../affiliation-links/generated-schemas/read-affiliation-link-orders.schema'
import { ReadNotificationOrdersSchema, ReadNotificationOrders } from '../../notifications/generated-schemas/read-notification-orders.schema'
import { ReadOrderItemOrdersSchema, ReadOrderItemOrders } from '../../orders/generated-schemas/read-order-item-orders.schema'
import { ReadMessageOrdersSchema, ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import { ReadCategoryOrdersSchema, ReadCategoryOrders } from '../../categories/generated-schemas/read-category-orders.schema'
import { ReadCollectionOrdersSchema, ReadCollectionOrders } from '../../collections/generated-schemas/read-collection-orders.schema'
import { ReadCartItemsOrdersSchema, ReadCartItemsOrders } from '../../carts/generated-schemas/read-cart-items-orders.schema'
import { ReadPromotionOrdersSchema, ReadPromotionOrders } from '../../promotions/generated-schemas/read-promotion-orders.schema'
import { ReadPromoCodeOrdersSchema, ReadPromoCodeOrders } from '../../promotions/generated-schemas/read-promo-code-orders.schema'
import { ReadSavedCollectionItemOrdersSchema, ReadSavedCollectionItemOrders } from '../../saved-collections/generated-schemas/read-saved-collection-item-orders.schema'



export class ReadProductOrders {isArchived?: OrderDirectionEnum | undefined;
title?: OrderDirectionEnum | undefined;
description?: OrderDirectionEnum | undefined;
basePrice?: OrderDirectionEnum | undefined;
sku?: OrderDirectionEnum | undefined;
currency?: OrderDirectionEnum | undefined;
stock?: OrderDirectionEnum | undefined;
lastStockUpdate?: OrderDirectionEnum | undefined;
isOutOfStock?: OrderDirectionEnum | undefined;
isFeatured?: OrderDirectionEnum | undefined;
deliveryEstimationInDays?: OrderDirectionEnum | undefined;
media?: ReadMediaOrders | OrderDirectionEnum | undefined;
variants?: ReadProductVariantOrders | OrderDirectionEnum | undefined;
options?: ReadProductOptionOrders | OrderDirectionEnum | undefined;
ratings?: ReadProductReviewOrders | OrderDirectionEnum | undefined;
taggedIn?: ReadTaggedProductOrders | OrderDirectionEnum | undefined;
affiliationLinks?: ReadAffiliationLinkOrders | OrderDirectionEnum | undefined;
notifications?: ReadNotificationOrders | OrderDirectionEnum | undefined;
orderItems?: ReadOrderItemOrders | OrderDirectionEnum | undefined;
messages?: ReadMessageOrders | OrderDirectionEnum | undefined;
brand?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
category?: ReadCategoryOrders | OrderDirectionEnum | undefined;
subCategory?: ReadCategoryOrders | OrderDirectionEnum | undefined;
collections?: ReadCollectionOrders | OrderDirectionEnum | undefined;
carts?: ReadCartItemsOrders | OrderDirectionEnum | undefined;
promotions?: ReadPromotionOrders | OrderDirectionEnum | undefined;
promoCodes?: ReadPromoCodeOrders | OrderDirectionEnum | undefined;
savedInCollections?: ReadSavedCollectionItemOrders | OrderDirectionEnum | undefined;
brandId?: OrderDirectionEnum | undefined;
categoryId?: OrderDirectionEnum | undefined;
subCategoryId?: OrderDirectionEnum | undefined;
averageRating?: OrderDirectionEnum | undefined;
isSaved?: OrderDirectionEnum | undefined}

export const ReadProductOrdersSchema: v.GenericSchema<ReadProductOrders> = v.object({isArchived: v.undefinedable(OrderDirectionSchema),
title: v.undefinedable(OrderDirectionSchema),
description: v.undefinedable(OrderDirectionSchema),
basePrice: v.undefinedable(OrderDirectionSchema),
sku: v.undefinedable(OrderDirectionSchema),
currency: v.undefinedable(OrderDirectionSchema),
stock: v.undefinedable(OrderDirectionSchema),
lastStockUpdate: v.undefinedable(OrderDirectionSchema),
isOutOfStock: v.undefinedable(OrderDirectionSchema),
isFeatured: v.undefinedable(OrderDirectionSchema),
deliveryEstimationInDays: v.undefinedable(OrderDirectionSchema),
media: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
variants: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)])),
options: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOptionOrdersSchema)])),
ratings: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductReviewOrdersSchema)])),
taggedIn: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadTaggedProductOrdersSchema)])),
affiliationLinks: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
notifications: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
orderItems: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
messages: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
brand: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
category: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
subCategory: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
collections: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCollectionOrdersSchema)])),
carts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartItemsOrdersSchema)])),
promotions: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)])),
promoCodes: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
savedInCollections: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionItemOrdersSchema)])),
brandId: v.undefinedable(OrderDirectionSchema),
categoryId: v.undefinedable(OrderDirectionSchema),
subCategoryId: v.undefinedable(OrderDirectionSchema),
averageRating: v.undefinedable(OrderDirectionSchema),
isSaved: v.undefinedable(OrderDirectionSchema)})



export type TReadProductOrdersSchemaOutput = v.InferOutput<typeof ReadProductOrdersSchema>;
export type TReadProductOrdersSchemaInput = v.InferInput<typeof ReadProductOrdersSchema>;
