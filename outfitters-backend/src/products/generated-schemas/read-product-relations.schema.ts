import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelationsSchemaRelations } from './read-product-variant-relations.schema'
import { ReadProductOptionRelationsSchema, ReadProductOptionRelationsSchemaRelations } from './read-product-option-relations.schema'
import { ReadProductReviewRelationsSchema, ReadProductReviewRelationsSchemaRelations } from './read-product-review-relations.schema'
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelationsSchemaRelations } from './read-tagged-product-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelationsSchemaRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'
import { ReadNotificationRelationsSchema, ReadNotificationRelationsSchemaRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'
import { ReadOrderItemRelationsSchema, ReadOrderItemRelationsSchemaRelations } from '../../orders/generated-schemas/read-order-item-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelationsSchemaRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadCategoryRelationsSchema, ReadCategoryRelationsSchemaRelations } from '../../categories/generated-schemas/read-category-relations.schema'
import { ReadCollectionRelationsSchema, ReadCollectionRelationsSchemaRelations } from '../../collections/generated-schemas/read-collection-relations.schema'
import { ReadCartItemsRelationsSchema, ReadCartItemsRelationsSchemaRelations } from '../../carts/generated-schemas/read-cart-items-relations.schema'
import { ReadPromotionRelationsSchema, ReadPromotionRelationsSchemaRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'
import { ReadPromoCodeRelationsSchema, ReadPromoCodeRelationsSchemaRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'
import { ReadSavedCollectionItemRelationsSchema, ReadSavedCollectionItemRelationsSchemaRelations } from '../../saved-collections/generated-schemas/read-saved-collection-item-relations.schema'

export class ReadProductRelationsSchemaRelations {media?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
variants?: ReadProductVariantRelationsSchemaRelations | boolean | null | undefined;
options?: ReadProductOptionRelationsSchemaRelations | boolean | null | undefined;
ratings?: ReadProductReviewRelationsSchemaRelations | boolean | null | undefined;
taggedIn?: ReadTaggedProductRelationsSchemaRelations | boolean | null | undefined;
affiliationLinks?: ReadAffiliationLinkRelationsSchemaRelations | boolean | null | undefined;
notifications?: ReadNotificationRelationsSchemaRelations | boolean | null | undefined;
orderItems?: ReadOrderItemRelationsSchemaRelations | boolean | null | undefined;
messages?: ReadMessageRelationsSchemaRelations | boolean | null | undefined;
brand?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
category?: ReadCategoryRelationsSchemaRelations | boolean | null | undefined;
subCategory?: ReadCategoryRelationsSchemaRelations | boolean | null | undefined;
collections?: ReadCollectionRelationsSchemaRelations | boolean | null | undefined;
carts?: ReadCartItemsRelationsSchemaRelations | boolean | null | undefined;
promotions?: ReadPromotionRelationsSchemaRelations | boolean | null | undefined;
promoCodes?: ReadPromoCodeRelationsSchemaRelations | boolean | null | undefined;
savedInCollections?: ReadSavedCollectionItemRelationsSchemaRelations | boolean | null | undefined}

export const ReadProductRelationsSchema: v.GenericSchema<ReadProductRelationsSchemaRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
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



export type TReadProductRelationsSchema = v.InferOutput<typeof ReadProductRelationsSchema>;

export type TReadProductRelationsSchemaInput = v.InferInput<typeof ReadProductRelationsSchema>;
