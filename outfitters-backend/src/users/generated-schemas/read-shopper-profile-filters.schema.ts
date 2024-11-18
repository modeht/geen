import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { GenderEnum } from '../entities/shopper-profile.entity';
import { ReadUserFiltersSchema, ReadUserFiltersSchemaFilters } from './read-user-filters.schema'
import { ReadProductReviewFiltersSchema, ReadProductReviewFiltersSchemaFilters } from '../../products/generated-schemas/read-product-review-filters.schema'
import { ReadShippingAddressFiltersSchema, ReadShippingAddressFiltersSchemaFilters } from './read-shipping-address-filters.schema'
import { ReadMediaFiltersSchema, ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import { ReadCartFiltersSchema, ReadCartFiltersSchemaFilters } from '../../carts/generated-schemas/read-cart-filters.schema'
import { ReadOrderFiltersSchema, ReadOrderFiltersSchemaFilters } from '../../orders/generated-schemas/read-order-filters.schema'
import { ReadPreferenceFiltersSchema, ReadPreferenceFiltersSchemaFilters } from '../../preferences/generated-schemas/read-preference-filters.schema'
import { ReadCollaborationFiltersSchema, ReadCollaborationFiltersSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration-filters.schema'
import { ReadAffiliationLinkFiltersSchema, ReadAffiliationLinkFiltersSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link-filters.schema'
import { ReadPromoCodeFiltersSchema, ReadPromoCodeFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promo-code-filters.schema'



export class ReadShopperProfileFiltersSchemaFilters {username?: GenericComparable<"string"> | null | undefined;
fullName?: GenericComparable<"string"> | null | undefined;
dateOfBirth?: GenericComparable<"date"> | null | undefined;
bio?: GenericComparable<"string"> | null | undefined;
gender?: GenderEnum | null | undefined;
onboardingStep?: GenericComparable<"number"> | null | undefined;
facebookProfileLink?: GenericComparable<"string"> | null | undefined;
instagramProfileLink?: GenericComparable<"string"> | null | undefined;
tiktokProfileLink?: GenericComparable<"string"> | null | undefined;
isOutfitter?: GenericComparable<"bool"> | null | undefined;
user?: ReadUserFiltersSchemaFilters | null | undefined;
reviews?: ReadProductReviewFiltersSchemaFilters | null | undefined;
addresses?: ReadShippingAddressFiltersSchemaFilters | null | undefined;
profilePicture?: ReadMediaFiltersSchemaFilters | null | undefined;
carts?: ReadCartFiltersSchemaFilters | null | undefined;
orders?: ReadOrderFiltersSchemaFilters | null | undefined;
preferences?: ReadPreferenceFiltersSchemaFilters | null | undefined;
collaborations?: ReadCollaborationFiltersSchemaFilters | null | undefined;
affiliationLinks?: ReadAffiliationLinkFiltersSchemaFilters | null | undefined;
promoCodes?: ReadPromoCodeFiltersSchemaFilters | null | undefined;
isFollowing?: GenericComparable<"bool"> | null | undefined;
hasStory?: GenericComparable<"bool"> | null | undefined;
followersCount?: GenericComparable<"number"> | null | undefined;
followingCount?: GenericComparable<"number"> | null | undefined;
postsCount?: GenericComparable<"number"> | null | undefined;
brandsCount?: GenericComparable<"number"> | null | undefined;
engagementCount?: GenericComparable<"number"> | null | undefined}

export const ReadShopperProfileFiltersSchema: v.GenericSchema<ReadShopperProfileFiltersSchemaFilters> = v.object({username: v.nullish(comparable("string")),
fullName: v.nullish(comparable("string")),
dateOfBirth: v.nullish(comparable("date")),
bio: v.nullish(comparable("string")),
gender: v.nullish(v.enum(GenderEnum)),
onboardingStep: v.nullish(comparable("number")),
facebookProfileLink: v.nullish(comparable("string")),
instagramProfileLink: v.nullish(comparable("string")),
tiktokProfileLink: v.nullish(comparable("string")),
isOutfitter: v.nullish(comparable("bool")),
user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
reviews: v.nullish(v.lazy(() => ReadProductReviewFiltersSchema)),
addresses: v.nullish(v.lazy(() => ReadShippingAddressFiltersSchema)),
profilePicture: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
carts: v.nullish(v.lazy(() => ReadCartFiltersSchema)),
orders: v.nullish(v.lazy(() => ReadOrderFiltersSchema)),
preferences: v.nullish(v.lazy(() => ReadPreferenceFiltersSchema)),
collaborations: v.nullish(v.lazy(() => ReadCollaborationFiltersSchema)),
affiliationLinks: v.nullish(v.lazy(() => ReadAffiliationLinkFiltersSchema)),
promoCodes: v.nullish(v.lazy(() => ReadPromoCodeFiltersSchema)),
isFollowing: v.nullish(comparable("bool")),
hasStory: v.nullish(comparable("bool")),
followersCount: v.nullish(comparable("number")),
followingCount: v.nullish(comparable("number")),
postsCount: v.nullish(comparable("number")),
brandsCount: v.nullish(comparable("number")),
engagementCount: v.nullish(comparable("number"))})



export type TReadShopperProfileFiltersSchemaOutput = v.InferOutput<typeof ReadShopperProfileFiltersSchema>;
export type TReadShopperProfileFiltersSchemaInput = v.InferInput<typeof ReadShopperProfileFiltersSchema>;
