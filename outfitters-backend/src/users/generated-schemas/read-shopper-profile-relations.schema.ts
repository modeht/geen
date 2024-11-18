import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { GenderEnum } from '../entities/shopper-profile.entity';
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from './read-user-relations.schema'
import { ReadProductReviewRelationsSchema, ReadProductReviewRelationsSchemaRelations } from '../../products/generated-schemas/read-product-review-relations.schema'
import { ReadShippingAddressRelationsSchema, ReadShippingAddressRelationsSchemaRelations } from './read-shipping-address-relations.schema'
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadCartRelationsSchema, ReadCartRelationsSchemaRelations } from '../../carts/generated-schemas/read-cart-relations.schema'
import { ReadOrderRelationsSchema, ReadOrderRelationsSchemaRelations } from '../../orders/generated-schemas/read-order-relations.schema'
import { ReadPreferenceRelationsSchema, ReadPreferenceRelationsSchemaRelations } from '../../preferences/generated-schemas/read-preference-relations.schema'
import { ReadCollaborationRelationsSchema, ReadCollaborationRelationsSchemaRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelationsSchemaRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'
import { ReadPromoCodeRelationsSchema, ReadPromoCodeRelationsSchemaRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'

export class ReadShopperProfileRelationsSchemaRelations {user?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
reviews?: ReadProductReviewRelationsSchemaRelations | boolean | null | undefined;
addresses?: ReadShippingAddressRelationsSchemaRelations | boolean | null | undefined;
profilePicture?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
carts?: ReadCartRelationsSchemaRelations | boolean | null | undefined;
orders?: ReadOrderRelationsSchemaRelations | boolean | null | undefined;
preferences?: ReadPreferenceRelationsSchemaRelations | boolean | null | undefined;
collaborations?: ReadCollaborationRelationsSchemaRelations | boolean | null | undefined;
affiliationLinks?: ReadAffiliationLinkRelationsSchemaRelations | boolean | null | undefined;
promoCodes?: ReadPromoCodeRelationsSchemaRelations | boolean | null | undefined}

export const ReadShopperProfileRelationsSchema: v.GenericSchema<ReadShopperProfileRelationsSchemaRelations> = v.object({user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
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
