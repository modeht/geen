import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadProductVariantSchema, ReadProductVariantSchemaFilters } from './read-product-variant.schema'
import { ReadProductOptionSchema, ReadProductOptionSchemaFilters } from './read-product-option.schema'
import { ReadProductReviewSchema, ReadProductReviewSchemaFilters } from './read-product-review.schema'
import { ReadTaggedProductSchema, ReadTaggedProductSchemaFilters } from './read-tagged-product.schema'
import { ReadAffiliationLinkSchema, ReadAffiliationLinkSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link.schema'
import { ReadNotificationSchema, ReadNotificationSchemaFilters } from '../../notifications/generated-schemas/read-notification.schema'
import { ReadOrderItemSchema, ReadOrderItemSchemaFilters } from '../../orders/generated-schemas/read-order-item.schema'
import { ReadMessageSchema, ReadMessageSchemaFilters } from '../../messages/generated-schemas/read-message.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from '../../users/generated-schemas/read-brand-profile.schema'
import { ReadCategorySchema, ReadCategorySchemaFilters } from '../../categories/generated-schemas/read-category.schema'
import { ReadCollectionSchema, ReadCollectionSchemaFilters } from '../../collections/generated-schemas/read-collection.schema'
import { ReadCartItemsSchema, ReadCartItemsSchemaFilters } from '../../carts/generated-schemas/read-cart-items.schema'
import { ReadPromotionSchema, ReadPromotionSchemaFilters } from '../../promotions/generated-schemas/read-promotion.schema'
import { ReadPromoCodeSchema, ReadPromoCodeSchemaFilters } from '../../promotions/generated-schemas/read-promo-code.schema'
import { ReadSavedCollectionItemSchema, ReadSavedCollectionItemSchemaFilters } from '../../saved-collections/generated-schemas/read-saved-collection-item.schema'

export class ReadProductSchemaFilters {isArchived?: GenericComparable<"bool"> | null | undefined;
title?: GenericComparable<"string"> | null | undefined;
description?: GenericComparable<"string"> | null | undefined;
basePrice?: GenericComparable<"number"> | null | undefined;
sku?: GenericComparable<"string"> | null | undefined;
currency?: GenericComparable<"string"> | null | undefined;
stock?: GenericComparable<"number"> | null | undefined;
lastStockUpdate?: GenericComparable<"date"> | null | undefined;
isOutOfStock?: GenericComparable<"bool"> | null | undefined;
isFeatured?: GenericComparable<"bool"> | null | undefined;
deliveryEstimationInDays?: GenericComparable<"number"> | null | undefined;
media?: ReadMediaSchemaFilters | null | undefined;
variants?: ReadProductVariantSchemaFilters | null | undefined;
options?: ReadProductOptionSchemaFilters | null | undefined;
ratings?: ReadProductReviewSchemaFilters | null | undefined;
taggedIn?: ReadTaggedProductSchemaFilters | null | undefined;
affiliationLinks?: ReadAffiliationLinkSchemaFilters | null | undefined;
notifications?: ReadNotificationSchemaFilters | null | undefined;
orderItems?: ReadOrderItemSchemaFilters | null | undefined;
messages?: ReadMessageSchemaFilters | null | undefined;
brand?: ReadBrandProfileSchemaFilters | null | undefined;
category?: ReadCategorySchemaFilters | null | undefined;
subCategory?: ReadCategorySchemaFilters | null | undefined;
collections?: ReadCollectionSchemaFilters | null | undefined;
carts?: ReadCartItemsSchemaFilters | null | undefined;
promotions?: ReadPromotionSchemaFilters | null | undefined;
promoCodes?: ReadPromoCodeSchemaFilters | null | undefined;
savedInCollections?: ReadSavedCollectionItemSchemaFilters | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined;
categoryId?: GenericComparable<"number"> | null | undefined;
subCategoryId?: GenericComparable<"number"> | null | undefined;
averageRating?: GenericComparable<"number"> | null | undefined;
isSaved?: GenericComparable<"bool"> | null | undefined}

export const ReadProductSchema: v.GenericSchema<ReadProductSchemaFilters> = v.object({isArchived: v.nullish(comparable("bool")),
title: v.nullish(comparable("string")),
description: v.nullish(comparable("string")),
basePrice: v.nullish(comparable("number")),
sku: v.nullish(comparable("string")),
currency: v.nullish(comparable("string")),
stock: v.nullish(comparable("number")),
lastStockUpdate: v.nullish(comparable("date")),
isOutOfStock: v.nullish(comparable("bool")),
isFeatured: v.nullish(comparable("bool")),
deliveryEstimationInDays: v.nullish(comparable("number")),
media: v.nullish(v.lazy(() => ReadMediaSchema)),
variants: v.nullish(v.lazy(() => ReadProductVariantSchema)),
options: v.nullish(v.lazy(() => ReadProductOptionSchema)),
ratings: v.nullish(v.lazy(() => ReadProductReviewSchema)),
taggedIn: v.nullish(v.lazy(() => ReadTaggedProductSchema)),
affiliationLinks: v.nullish(v.lazy(() => ReadAffiliationLinkSchema)),
notifications: v.nullish(v.lazy(() => ReadNotificationSchema)),
orderItems: v.nullish(v.lazy(() => ReadOrderItemSchema)),
messages: v.nullish(v.lazy(() => ReadMessageSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
category: v.nullish(v.lazy(() => ReadCategorySchema)),
subCategory: v.nullish(v.lazy(() => ReadCategorySchema)),
collections: v.nullish(v.lazy(() => ReadCollectionSchema)),
carts: v.nullish(v.lazy(() => ReadCartItemsSchema)),
promotions: v.nullish(v.lazy(() => ReadPromotionSchema)),
promoCodes: v.nullish(v.lazy(() => ReadPromoCodeSchema)),
savedInCollections: v.nullish(v.lazy(() => ReadSavedCollectionItemSchema)),
brandId: v.nullish(comparable("number")),
categoryId: v.nullish(comparable("number")),
subCategoryId: v.nullish(comparable("number")),
averageRating: v.nullish(comparable("number")),
isSaved: v.nullish(comparable("bool"))})



export type TReadProductSchema = v.InferOutput<typeof ReadProductSchema>
export type TReadProductSchemaInput = v.InferInput<typeof ReadProductSchema>
