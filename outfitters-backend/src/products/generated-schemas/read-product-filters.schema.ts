import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaFiltersSchema, ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import { ReadProductVariantFiltersSchema, ReadProductVariantFiltersSchemaFilters } from './read-product-variant-filters.schema'
import { ReadProductOptionFiltersSchema, ReadProductOptionFiltersSchemaFilters } from './read-product-option-filters.schema'
import { ReadProductReviewFiltersSchema, ReadProductReviewFiltersSchemaFilters } from './read-product-review-filters.schema'
import { ReadTaggedProductFiltersSchema, ReadTaggedProductFiltersSchemaFilters } from './read-tagged-product-filters.schema'
import { ReadAffiliationLinkFiltersSchema, ReadAffiliationLinkFiltersSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link-filters.schema'
import { ReadNotificationFiltersSchema, ReadNotificationFiltersSchemaFilters } from '../../notifications/generated-schemas/read-notification-filters.schema'
import { ReadOrderItemFiltersSchema, ReadOrderItemFiltersSchemaFilters } from '../../orders/generated-schemas/read-order-item-filters.schema'
import { ReadMessageFiltersSchema, ReadMessageFiltersSchemaFilters } from '../../messages/generated-schemas/read-message-filters.schema'
import { ReadBrandProfileFiltersSchema, ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'
import { ReadCategoryFiltersSchema, ReadCategoryFiltersSchemaFilters } from '../../categories/generated-schemas/read-category-filters.schema'
import { ReadCollectionFiltersSchema, ReadCollectionFiltersSchemaFilters } from '../../collections/generated-schemas/read-collection-filters.schema'
import { ReadCartItemsFiltersSchema, ReadCartItemsFiltersSchemaFilters } from '../../carts/generated-schemas/read-cart-items-filters.schema'
import { ReadPromotionFiltersSchema, ReadPromotionFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promotion-filters.schema'
import { ReadPromoCodeFiltersSchema, ReadPromoCodeFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promo-code-filters.schema'
import { ReadSavedCollectionItemFiltersSchema, ReadSavedCollectionItemFiltersSchemaFilters } from '../../saved-collections/generated-schemas/read-saved-collection-item-filters.schema'

export class ReadProductFiltersSchemaFilters {isArchived?: GenericComparable<"bool"> | null | undefined;
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
media?: ReadMediaFiltersSchemaFilters | null | undefined;
variants?: ReadProductVariantFiltersSchemaFilters | null | undefined;
options?: ReadProductOptionFiltersSchemaFilters | null | undefined;
ratings?: ReadProductReviewFiltersSchemaFilters | null | undefined;
taggedIn?: ReadTaggedProductFiltersSchemaFilters | null | undefined;
affiliationLinks?: ReadAffiliationLinkFiltersSchemaFilters | null | undefined;
notifications?: ReadNotificationFiltersSchemaFilters | null | undefined;
orderItems?: ReadOrderItemFiltersSchemaFilters | null | undefined;
messages?: ReadMessageFiltersSchemaFilters | null | undefined;
brand?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
category?: ReadCategoryFiltersSchemaFilters | null | undefined;
subCategory?: ReadCategoryFiltersSchemaFilters | null | undefined;
collections?: ReadCollectionFiltersSchemaFilters | null | undefined;
carts?: ReadCartItemsFiltersSchemaFilters | null | undefined;
promotions?: ReadPromotionFiltersSchemaFilters | null | undefined;
promoCodes?: ReadPromoCodeFiltersSchemaFilters | null | undefined;
savedInCollections?: ReadSavedCollectionItemFiltersSchemaFilters | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined;
categoryId?: GenericComparable<"number"> | null | undefined;
subCategoryId?: GenericComparable<"number"> | null | undefined;
averageRating?: GenericComparable<"number"> | null | undefined;
isSaved?: GenericComparable<"bool"> | null | undefined}

export const ReadProductFiltersSchema: v.GenericSchema<ReadProductFiltersSchemaFilters> = v.object({isArchived: v.nullish(comparable("bool")),
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
media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
variants: v.nullish(v.lazy(() => ReadProductVariantFiltersSchema)),
options: v.nullish(v.lazy(() => ReadProductOptionFiltersSchema)),
ratings: v.nullish(v.lazy(() => ReadProductReviewFiltersSchema)),
taggedIn: v.nullish(v.lazy(() => ReadTaggedProductFiltersSchema)),
affiliationLinks: v.nullish(v.lazy(() => ReadAffiliationLinkFiltersSchema)),
notifications: v.nullish(v.lazy(() => ReadNotificationFiltersSchema)),
orderItems: v.nullish(v.lazy(() => ReadOrderItemFiltersSchema)),
messages: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
category: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
subCategory: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
collections: v.nullish(v.lazy(() => ReadCollectionFiltersSchema)),
carts: v.nullish(v.lazy(() => ReadCartItemsFiltersSchema)),
promotions: v.nullish(v.lazy(() => ReadPromotionFiltersSchema)),
promoCodes: v.nullish(v.lazy(() => ReadPromoCodeFiltersSchema)),
savedInCollections: v.nullish(v.lazy(() => ReadSavedCollectionItemFiltersSchema)),
brandId: v.nullish(comparable("number")),
categoryId: v.nullish(comparable("number")),
subCategoryId: v.nullish(comparable("number")),
averageRating: v.nullish(comparable("number")),
isSaved: v.nullish(comparable("bool"))})



export type TReadProductFiltersSchemaOutput = v.InferOutput<typeof ReadProductFiltersSchema>;
export type TReadProductFiltersSchemaInput = v.InferInput<typeof ReadProductFiltersSchema>;
