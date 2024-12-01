import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { GenderEnum } from '../entities/shopper-profile.entity';
import ReadUserFiltersSchema, { ReadUserFiltersSchemaFilters } from './read-user-filters.schema'
import ReadProductReviewFiltersSchema, { ReadProductReviewFiltersSchemaFilters } from '../../products/generated-schemas/read-product-review-filters.schema'
import ReadShippingAddressFiltersSchema, { ReadShippingAddressFiltersSchemaFilters } from './read-shipping-address-filters.schema'
import ReadMediaFiltersSchema, { ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import ReadCartFiltersSchema, { ReadCartFiltersSchemaFilters } from '../../carts/generated-schemas/read-cart-filters.schema'
import ReadOrderFiltersSchema, { ReadOrderFiltersSchemaFilters } from '../../orders/generated-schemas/read-order-filters.schema'
import ReadPreferenceFiltersSchema, { ReadPreferenceFiltersSchemaFilters } from '../../preferences/generated-schemas/read-preference-filters.schema'
import ReadCollaborationFiltersSchema, { ReadCollaborationFiltersSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration-filters.schema'
import ReadAffiliationLinkFiltersSchema, { ReadAffiliationLinkFiltersSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link-filters.schema'
import ReadPromoCodeFiltersSchema, { ReadPromoCodeFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promo-code-filters.schema'



export class ReadShopperProfileFiltersSchemaFilters {username?: GenericComparable<"string"> | null;
fullName?: GenericComparable<"string"> | null;
dateOfBirth?: GenericComparable<"date"> | null;
bio?: GenericComparable<"string"> | null;
gender?: GenderEnum | null;
onboardingStep?: GenericComparable<"number"> | null;
facebookProfileLink?: GenericComparable<"string"> | null;
instagramProfileLink?: GenericComparable<"string"> | null;
tiktokProfileLink?: GenericComparable<"string"> | null;
isOutfitter?: GenericComparable<"bool"> | null;
user?: ReadUserFiltersSchemaFilters | null;
reviews?: ReadProductReviewFiltersSchemaFilters | null;
addresses?: ReadShippingAddressFiltersSchemaFilters | null;
profilePicture?: ReadMediaFiltersSchemaFilters | null;
carts?: ReadCartFiltersSchemaFilters | null;
orders?: ReadOrderFiltersSchemaFilters | null;
preferences?: ReadPreferenceFiltersSchemaFilters | null;
collaborations?: ReadCollaborationFiltersSchemaFilters | null;
affiliationLinks?: ReadAffiliationLinkFiltersSchemaFilters | null;
promoCodes?: ReadPromoCodeFiltersSchemaFilters | null;
isFollowing?: GenericComparable<"bool"> | null;
hasStory?: GenericComparable<"bool"> | null;
followersCount?: GenericComparable<"number"> | null;
followingCount?: GenericComparable<"number"> | null;
postsCount?: GenericComparable<"number"> | null;
brandsCount?: GenericComparable<"number"> | null;
engagementCount?: GenericComparable<"number"> | null}

const ReadShopperProfileFiltersSchema: v.GenericSchema<ReadShopperProfileFiltersSchemaFilters> = v.object({username: v.nullish(comparable("string")),
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
engagementCount: v.nullish(comparable("number"))});

export default ReadShopperProfileFiltersSchema;




export type TReadShopperProfileFiltersSchemaOutput = v.InferOutput<typeof ReadShopperProfileFiltersSchema>;
export type TReadShopperProfileFiltersSchemaInput = v.InferInput<typeof ReadShopperProfileFiltersSchema>;
