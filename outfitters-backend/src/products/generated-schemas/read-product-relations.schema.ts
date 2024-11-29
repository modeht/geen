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



export class ReadProductRelations {media?: ReadMediaRelations | string | boolean | undefined;
variants?: ReadProductVariantRelations | string | boolean | undefined;
options?: ReadProductOptionRelations | string | boolean | undefined;
ratings?: ReadProductReviewRelations | string | boolean | undefined;
taggedIn?: ReadTaggedProductRelations | string | boolean | undefined;
affiliationLinks?: ReadAffiliationLinkRelations | string | boolean | undefined;
notifications?: ReadNotificationRelations | string | boolean | undefined;
orderItems?: ReadOrderItemRelations | string | boolean | undefined;
messages?: ReadMessageRelations | string | boolean | undefined;
brand?: ReadBrandProfileRelations | string | boolean | undefined;
category?: ReadCategoryRelations | string | boolean | undefined;
subCategory?: ReadCategoryRelations | string | boolean | undefined;
collections?: ReadCollectionRelations | string | boolean | undefined;
carts?: ReadCartItemsRelations | string | boolean | undefined;
promotions?: ReadPromotionRelations | string | boolean | undefined;
promoCodes?: ReadPromoCodeRelations | string | boolean | undefined;
savedInCollections?: ReadSavedCollectionItemRelations | string | boolean | undefined}

const ReadProductRelationsSchema: v.GenericSchema<ReadProductRelations> = v.object({media: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
variants: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductVariantRelationsSchema)])),
options: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductOptionRelationsSchema)])),
ratings: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductReviewRelationsSchema)])),
taggedIn: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadTaggedProductRelationsSchema)])),
affiliationLinks: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadAffiliationLinkRelationsSchema)])),
notifications: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadNotificationRelationsSchema)])),
orderItems: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadOrderItemRelationsSchema)])),
messages: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)])),
brand: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
category: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCategoryRelationsSchema)])),
subCategory: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCategoryRelationsSchema)])),
collections: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCollectionRelationsSchema)])),
carts: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCartItemsRelationsSchema)])),
promotions: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPromotionRelationsSchema)])),
promoCodes: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPromoCodeRelationsSchema)])),
savedInCollections: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadSavedCollectionItemRelationsSchema)]))});

export default ReadProductRelationsSchema;




export type TReadProductRelationsSchemaOutput = v.InferOutput<typeof ReadProductRelationsSchema>;
export type TReadProductRelationsSchemaInput = v.InferInput<typeof ReadProductRelationsSchema>;
