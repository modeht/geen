import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { GenderEnum } from '../entities/shopper-profile.entity';
import { ReadUserSchema, ReadUserSchemaFilters } from './read-user.schema'
import { ReadProductReviewSchema, ReadProductReviewSchemaFilters } from '../../products/generated-schemas/read-product-review.schema'
import { ReadShippingAddressSchema, ReadShippingAddressSchemaFilters } from './read-shipping-address.schema'
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadCartSchema, ReadCartSchemaFilters } from '../../carts/generated-schemas/read-cart.schema'
import { ReadOrderSchema, ReadOrderSchemaFilters } from '../../orders/generated-schemas/read-order.schema'
import { ReadPreferenceSchema, ReadPreferenceSchemaFilters } from '../../preferences/generated-schemas/read-preference.schema'
import { ReadCollaborationSchema, ReadCollaborationSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration.schema'
import { ReadAffiliationLinkSchema, ReadAffiliationLinkSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link.schema'
import { ReadPromoCodeSchema, ReadPromoCodeSchemaFilters } from '../../promotions/generated-schemas/read-promo-code.schema'

export class ReadShopperProfileSchemaFilters {username?: GenericComparable<"string"> | null | undefined;
fullName?: GenericComparable<"string"> | null | undefined;
dateOfBirth?: GenericComparable<"date"> | null | undefined;
bio?: GenericComparable<"string"> | null | undefined;
onboardingStep?: GenericComparable<"number"> | null | undefined;
facebookProfileLink?: GenericComparable<"string"> | null | undefined;
instagramProfileLink?: GenericComparable<"string"> | null | undefined;
tiktokProfileLink?: GenericComparable<"string"> | null | undefined;
isOutfitter?: GenericComparable<"bool"> | null | undefined;
user?: ReadUserSchemaFilters | null | undefined;
reviews?: ReadProductReviewSchemaFilters | null | undefined;
addresses?: ReadShippingAddressSchemaFilters | null | undefined;
profilePicture?: ReadMediaSchemaFilters | null | undefined;
carts?: ReadCartSchemaFilters | null | undefined;
orders?: ReadOrderSchemaFilters | null | undefined;
preferences?: ReadPreferenceSchemaFilters | null | undefined;
collaborations?: ReadCollaborationSchemaFilters | null | undefined;
affiliationLinks?: ReadAffiliationLinkSchemaFilters | null | undefined;
promoCodes?: ReadPromoCodeSchemaFilters | null | undefined;
isFollowing?: GenericComparable<"bool"> | null | undefined;
hasStory?: GenericComparable<"bool"> | null | undefined;
followersCount?: GenericComparable<"number"> | null | undefined;
followingCount?: GenericComparable<"number"> | null | undefined;
postsCount?: GenericComparable<"number"> | null | undefined;
brandsCount?: GenericComparable<"number"> | null | undefined;
engagementCount?: GenericComparable<"number"> | null | undefined}

export const ReadShopperProfileSchema: v.GenericSchema<ReadShopperProfileSchemaFilters> = v.object({username: v.nullish(comparable("string")),
fullName: v.nullish(comparable("string")),
dateOfBirth: v.nullish(comparable("date")),
bio: v.nullish(comparable("string")),
onboardingStep: v.nullish(comparable("number")),
facebookProfileLink: v.nullish(comparable("string")),
instagramProfileLink: v.nullish(comparable("string")),
tiktokProfileLink: v.nullish(comparable("string")),
isOutfitter: v.nullish(comparable("bool")),
user: v.nullish(v.lazy(() => ReadUserSchema)),
reviews: v.nullish(v.lazy(() => ReadProductReviewSchema)),
addresses: v.nullish(v.lazy(() => ReadShippingAddressSchema)),
profilePicture: v.nullish(v.lazy(() => ReadMediaSchema)),
carts: v.nullish(v.lazy(() => ReadCartSchema)),
orders: v.nullish(v.lazy(() => ReadOrderSchema)),
preferences: v.nullish(v.lazy(() => ReadPreferenceSchema)),
collaborations: v.nullish(v.lazy(() => ReadCollaborationSchema)),
affiliationLinks: v.nullish(v.lazy(() => ReadAffiliationLinkSchema)),
promoCodes: v.nullish(v.lazy(() => ReadPromoCodeSchema)),
isFollowing: v.nullish(comparable("bool")),
hasStory: v.nullish(comparable("bool")),
followersCount: v.nullish(comparable("number")),
followingCount: v.nullish(comparable("number")),
postsCount: v.nullish(comparable("number")),
brandsCount: v.nullish(comparable("number")),
engagementCount: v.nullish(comparable("number"))})



export type TReadShopperProfileSchema = v.InferOutput<typeof ReadShopperProfileSchema>
export type TReadShopperProfileSchemaInput = v.InferInput<typeof ReadShopperProfileSchema>
