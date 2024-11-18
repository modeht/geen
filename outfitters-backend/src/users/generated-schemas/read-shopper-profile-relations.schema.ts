import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { GenderEnum } from '../entities/shopper-profile.entity';
import { ReadUserRelationsSchema, ReadUserRelations } from './read-user-relations.schema'
import { ReadProductReviewRelationsSchema, ReadProductReviewRelations } from '../../products/generated-schemas/read-product-review-relations.schema'
import { ReadShippingAddressRelationsSchema, ReadShippingAddressRelations } from './read-shipping-address-relations.schema'
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadCartRelationsSchema, ReadCartRelations } from '../../carts/generated-schemas/read-cart-relations.schema'
import { ReadOrderRelationsSchema, ReadOrderRelations } from '../../orders/generated-schemas/read-order-relations.schema'
import { ReadPreferenceRelationsSchema, ReadPreferenceRelations } from '../../preferences/generated-schemas/read-preference-relations.schema'
import { ReadCollaborationRelationsSchema, ReadCollaborationRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'
import { ReadPromoCodeRelationsSchema, ReadPromoCodeRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'



export class ReadShopperProfileRelations {gender?: GenderEnum | null | undefined;
user?: ReadUserRelations | boolean | null | undefined;
reviews?: ReadProductReviewRelations | boolean | null | undefined;
addresses?: ReadShippingAddressRelations | boolean | null | undefined;
profilePicture?: ReadMediaRelations | boolean | null | undefined;
carts?: ReadCartRelations | boolean | null | undefined;
orders?: ReadOrderRelations | boolean | null | undefined;
preferences?: ReadPreferenceRelations | boolean | null | undefined;
collaborations?: ReadCollaborationRelations | boolean | null | undefined;
affiliationLinks?: ReadAffiliationLinkRelations | boolean | null | undefined;
promoCodes?: ReadPromoCodeRelations | boolean | null | undefined}

export const ReadShopperProfileRelationsSchema: v.GenericSchema<ReadShopperProfileRelations> = v.object({gender: v.nullish(v.enum(GenderEnum)),
user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
reviews: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductReviewRelationsSchema)])),
addresses: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShippingAddressRelationsSchema)])),
profilePicture: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
carts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartRelationsSchema)])),
orders: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderRelationsSchema)])),
preferences: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPreferenceRelationsSchema)])),
collaborations: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCollaborationRelationsSchema)])),
affiliationLinks: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkRelationsSchema)])),
promoCodes: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromoCodeRelationsSchema)]))})



export type TReadShopperProfileRelationsSchemaOutput = v.InferOutput<typeof ReadShopperProfileRelationsSchema>;
export type TReadShopperProfileRelationsSchemaInput = v.InferInput<typeof ReadShopperProfileRelationsSchema>;
