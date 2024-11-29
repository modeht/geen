import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { GenderEnum } from '../entities/shopper-profile.entity';
import ReadUserOrdersSchema, { ReadUserOrders } from './read-user-orders.schema'
import ReadProductReviewOrdersSchema, { ReadProductReviewOrders } from '../../products/generated-schemas/read-product-review-orders.schema'
import ReadShippingAddressOrdersSchema, { ReadShippingAddressOrders } from './read-shipping-address-orders.schema'
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import ReadCartOrdersSchema, { ReadCartOrders } from '../../carts/generated-schemas/read-cart-orders.schema'
import ReadOrderOrdersSchema, { ReadOrderOrders } from '../../orders/generated-schemas/read-order-orders.schema'
import ReadPreferenceOrdersSchema, { ReadPreferenceOrders } from '../../preferences/generated-schemas/read-preference-orders.schema'
import ReadCollaborationOrdersSchema, { ReadCollaborationOrders } from '../../collaborations/generated-schemas/read-collaboration-orders.schema'
import ReadAffiliationLinkOrdersSchema, { ReadAffiliationLinkOrders } from '../../affiliation-links/generated-schemas/read-affiliation-link-orders.schema'
import ReadPromoCodeOrdersSchema, { ReadPromoCodeOrders } from '../../promotions/generated-schemas/read-promo-code-orders.schema'



export class ReadShopperProfileOrders {username?: OrderDirectionEnum | undefined;
fullName?: OrderDirectionEnum | undefined;
dateOfBirth?: OrderDirectionEnum | undefined;
bio?: OrderDirectionEnum | undefined;
gender?: GenderEnum | null | undefined;
onboardingStep?: OrderDirectionEnum | undefined;
facebookProfileLink?: OrderDirectionEnum | undefined;
instagramProfileLink?: OrderDirectionEnum | undefined;
tiktokProfileLink?: OrderDirectionEnum | undefined;
isOutfitter?: OrderDirectionEnum | undefined;
user?: ReadUserOrders | OrderDirectionEnum | undefined;
reviews?: ReadProductReviewOrders | OrderDirectionEnum | undefined;
addresses?: ReadShippingAddressOrders | OrderDirectionEnum | undefined;
profilePicture?: ReadMediaOrders | OrderDirectionEnum | undefined;
carts?: ReadCartOrders | OrderDirectionEnum | undefined;
orders?: ReadOrderOrders | OrderDirectionEnum | undefined;
preferences?: ReadPreferenceOrders | OrderDirectionEnum | undefined;
collaborations?: ReadCollaborationOrders | OrderDirectionEnum | undefined;
affiliationLinks?: ReadAffiliationLinkOrders | OrderDirectionEnum | undefined;
promoCodes?: ReadPromoCodeOrders | OrderDirectionEnum | undefined;
isFollowing?: OrderDirectionEnum | undefined;
hasStory?: OrderDirectionEnum | undefined;
followersCount?: OrderDirectionEnum | undefined;
followingCount?: OrderDirectionEnum | undefined;
postsCount?: OrderDirectionEnum | undefined;
brandsCount?: OrderDirectionEnum | undefined;
engagementCount?: OrderDirectionEnum | undefined}

const ReadShopperProfileOrdersSchema: v.GenericSchema<ReadShopperProfileOrders> = v.object({username: v.undefinedable(OrderDirectionSchema),
fullName: v.undefinedable(OrderDirectionSchema),
dateOfBirth: v.undefinedable(OrderDirectionSchema),
bio: v.undefinedable(OrderDirectionSchema),
gender: v.nullish(v.enum(GenderEnum)),
onboardingStep: v.undefinedable(OrderDirectionSchema),
facebookProfileLink: v.undefinedable(OrderDirectionSchema),
instagramProfileLink: v.undefinedable(OrderDirectionSchema),
tiktokProfileLink: v.undefinedable(OrderDirectionSchema),
isOutfitter: v.undefinedable(OrderDirectionSchema),
user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
reviews: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductReviewOrdersSchema)])),
addresses: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShippingAddressOrdersSchema)])),
profilePicture: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
carts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
orders: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
preferences: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPreferenceOrdersSchema)])),
collaborations: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCollaborationOrdersSchema)])),
affiliationLinks: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
promoCodes: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
isFollowing: v.undefinedable(OrderDirectionSchema),
hasStory: v.undefinedable(OrderDirectionSchema),
followersCount: v.undefinedable(OrderDirectionSchema),
followingCount: v.undefinedable(OrderDirectionSchema),
postsCount: v.undefinedable(OrderDirectionSchema),
brandsCount: v.undefinedable(OrderDirectionSchema),
engagementCount: v.undefinedable(OrderDirectionSchema)});

export default ReadShopperProfileOrdersSchema;




export type TReadShopperProfileOrdersSchemaOutput = v.InferOutput<typeof ReadShopperProfileOrdersSchema>;
export type TReadShopperProfileOrdersSchemaInput = v.InferInput<typeof ReadShopperProfileOrdersSchema>;
