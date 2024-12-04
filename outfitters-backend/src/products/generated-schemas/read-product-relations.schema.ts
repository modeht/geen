import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadMediaRelationsSchema, { ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import ReadProductVariantRelationsSchema, { ReadProductVariantRelations } from './read-product-variant-relations.schema'
import ReadProductOptionRelationsSchema, { ReadProductOptionRelations } from './read-product-option-relations.schema'
import ReadProductReviewRelationsSchema, { ReadProductReviewRelations } from './read-product-review-relations.schema'
import ReadTaggedProductRelationsSchema, { ReadTaggedProductRelations } from './read-tagged-product-relations.schema'
import ReadAffiliationLinkRelationsSchema, { ReadAffiliationLinkRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'
import ReadNotificationRelationsSchema, { ReadNotificationRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'
import ReadOrderItemRelationsSchema, { ReadOrderItemRelations } from '../../orders/generated-schemas/read-order-item-relations.schema'
import ReadMessageRelationsSchema, { ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import ReadBrandProfileRelationsSchema, { ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import ReadCategoryRelationsSchema, { ReadCategoryRelations } from '../../categories/generated-schemas/read-category-relations.schema'
import ReadCollectionRelationsSchema, { ReadCollectionRelations } from '../../collections/generated-schemas/read-collection-relations.schema'
import ReadCartItemsRelationsSchema, { ReadCartItemsRelations } from '../../carts/generated-schemas/read-cart-items-relations.schema'
import ReadPromotionRelationsSchema, { ReadPromotionRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'
import ReadPromoCodeRelationsSchema, { ReadPromoCodeRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'
import ReadSavedCollectionItemRelationsSchema, { ReadSavedCollectionItemRelations } from '../../saved-collections/generated-schemas/read-saved-collection-item-relations.schema'



export class ReadProductRelations {media?: ReadMediaRelations | string | boolean;
variants?: ReadProductVariantRelations | string | boolean;
options?: ReadProductOptionRelations | string | boolean;
ratings?: ReadProductReviewRelations | string | boolean;
taggedIn?: ReadTaggedProductRelations | string | boolean;
affiliationLinks?: ReadAffiliationLinkRelations | string | boolean;
notifications?: ReadNotificationRelations | string | boolean;
orderItems?: ReadOrderItemRelations | string | boolean;
messages?: ReadMessageRelations | string | boolean;
brand?: ReadBrandProfileRelations | string | boolean;
category?: ReadCategoryRelations | string | boolean;
subCategory?: ReadCategoryRelations | string | boolean;
collections?: ReadCollectionRelations | string | boolean;
carts?: ReadCartItemsRelations | string | boolean;
promotions?: ReadPromotionRelations | string | boolean;
promoCodes?: ReadPromoCodeRelations | string | boolean;
savedInCollections?: ReadSavedCollectionItemRelations | string | boolean}

const ReadProductRelationsSchema: v.GenericSchema<ReadProductRelations> = v.object({media: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
variants: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductVariantRelationsSchema)])),
options: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductOptionRelationsSchema)])),
ratings: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductReviewRelationsSchema)])),
taggedIn: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadTaggedProductRelationsSchema)])),
affiliationLinks: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadAffiliationLinkRelationsSchema)])),
notifications: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadNotificationRelationsSchema)])),
orderItems: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadOrderItemRelationsSchema)])),
messages: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)])),
brand: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
category: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCategoryRelationsSchema)])),
subCategory: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCategoryRelationsSchema)])),
collections: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCollectionRelationsSchema)])),
carts: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCartItemsRelationsSchema)])),
promotions: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPromotionRelationsSchema)])),
promoCodes: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPromoCodeRelationsSchema)])),
savedInCollections: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadSavedCollectionItemRelationsSchema)]))});

export default ReadProductRelationsSchema;




export type TReadProductRelationsSchemaOutput = v.InferOutput<typeof ReadProductRelationsSchema>;
export type TReadProductRelationsSchemaInput = v.InferInput<typeof ReadProductRelationsSchema>;
