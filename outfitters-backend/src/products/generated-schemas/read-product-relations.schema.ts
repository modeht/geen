import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelations } from './read-product-variant-relations.schema'
import { ReadProductOptionRelationsSchema, ReadProductOptionRelations } from './read-product-option-relations.schema'
import { ReadProductReviewRelationsSchema, ReadProductReviewRelations } from './read-product-review-relations.schema'
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelations } from './read-tagged-product-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'
import { ReadNotificationRelationsSchema, ReadNotificationRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'
import { ReadOrderItemRelationsSchema, ReadOrderItemRelations } from '../../orders/generated-schemas/read-order-item-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadCategoryRelationsSchema, ReadCategoryRelations } from '../../categories/generated-schemas/read-category-relations.schema'
import { ReadCollectionRelationsSchema, ReadCollectionRelations } from '../../collections/generated-schemas/read-collection-relations.schema'
import { ReadCartItemsRelationsSchema, ReadCartItemsRelations } from '../../carts/generated-schemas/read-cart-items-relations.schema'
import { ReadPromotionRelationsSchema, ReadPromotionRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'
import { ReadPromoCodeRelationsSchema, ReadPromoCodeRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'
import { ReadSavedCollectionItemRelationsSchema, ReadSavedCollectionItemRelations } from '../../saved-collections/generated-schemas/read-saved-collection-item-relations.schema'



export class ReadProductRelations {media?: ReadMediaRelations | boolean | null | undefined;
variants?: ReadProductVariantRelations | boolean | null | undefined;
options?: ReadProductOptionRelations | boolean | null | undefined;
ratings?: ReadProductReviewRelations | boolean | null | undefined;
taggedIn?: ReadTaggedProductRelations | boolean | null | undefined;
affiliationLinks?: ReadAffiliationLinkRelations | boolean | null | undefined;
notifications?: ReadNotificationRelations | boolean | null | undefined;
orderItems?: ReadOrderItemRelations | boolean | null | undefined;
messages?: ReadMessageRelations | boolean | null | undefined;
brand?: ReadBrandProfileRelations | boolean | null | undefined;
category?: ReadCategoryRelations | boolean | null | undefined;
subCategory?: ReadCategoryRelations | boolean | null | undefined;
collections?: ReadCollectionRelations | boolean | null | undefined;
carts?: ReadCartItemsRelations | boolean | null | undefined;
promotions?: ReadPromotionRelations | boolean | null | undefined;
promoCodes?: ReadPromoCodeRelations | boolean | null | undefined;
savedInCollections?: ReadSavedCollectionItemRelations | boolean | null | undefined}

export const ReadProductRelationsSchema: v.GenericSchema<ReadProductRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
variants: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductVariantRelationsSchema)])),
options: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductOptionRelationsSchema)])),
ratings: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductReviewRelationsSchema)])),
taggedIn: v.nullish(v.union([v.boolean(), v.lazy(() => ReadTaggedProductRelationsSchema)])),
affiliationLinks: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkRelationsSchema)])),
notifications: v.nullish(v.union([v.boolean(), v.lazy(() => ReadNotificationRelationsSchema)])),
orderItems: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderItemRelationsSchema)])),
messages: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)])),
brand: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
category: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)])),
subCategory: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)])),
collections: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCollectionRelationsSchema)])),
carts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartItemsRelationsSchema)])),
promotions: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromotionRelationsSchema)])),
promoCodes: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromoCodeRelationsSchema)])),
savedInCollections: v.nullish(v.union([v.boolean(), v.lazy(() => ReadSavedCollectionItemRelationsSchema)]))})



export type TReadProductRelationsSchemaOutput = v.InferOutput<typeof ReadProductRelationsSchema>;
export type TReadProductRelationsSchemaInput = v.InferInput<typeof ReadProductRelationsSchema>;
