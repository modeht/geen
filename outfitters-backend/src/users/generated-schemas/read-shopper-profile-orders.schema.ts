import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import { GenderEnum } from '../entities/shopper-profile.entity';
import ReadUserOrdersSchema, { ReadUserOrders } from './read-user-orders.schema';
import ReadProductReviewOrdersSchema, {
	ReadProductReviewOrders,
} from '../../products/generated-schemas/read-product-review-orders.schema';
import ReadShippingAddressOrdersSchema, { ReadShippingAddressOrders } from './read-shipping-address-orders.schema';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadCartOrdersSchema, { ReadCartOrders } from '../../carts/generated-schemas/read-cart-orders.schema';
import ReadOrderOrdersSchema, { ReadOrderOrders } from '../../orders/generated-schemas/read-order-orders.schema';
import ReadPreferenceOrdersSchema, {
	ReadPreferenceOrders,
} from '../../preferences/generated-schemas/read-preference-orders.schema';
import ReadCollaborationOrdersSchema, {
	ReadCollaborationOrders,
} from '../../collaborations/generated-schemas/read-collaboration-orders.schema';
import ReadAffiliationLinkOrdersSchema, {
	ReadAffiliationLinkOrders,
} from '../../affiliation-links/generated-schemas/read-affiliation-link-orders.schema';
import ReadPromoCodeOrdersSchema, {
	ReadPromoCodeOrders,
} from '../../promotions/generated-schemas/read-promo-code-orders.schema';

export class ReadShopperProfileOrders {
	username?: OrderDirectionEnum;
	fullName?: OrderDirectionEnum;
	dateOfBirth?: OrderDirectionEnum;
	bio?: OrderDirectionEnum;
	gender?: GenderEnum | null;
	onboardingStep?: OrderDirectionEnum;
	facebookProfileLink?: OrderDirectionEnum;
	instagramProfileLink?: OrderDirectionEnum;
	tiktokProfileLink?: OrderDirectionEnum;
	isOutfitter?: OrderDirectionEnum;
	user?: ReadUserOrders | OrderDirectionEnum;
	reviews?: ReadProductReviewOrders | OrderDirectionEnum;
	addresses?: ReadShippingAddressOrders | OrderDirectionEnum;
	profilePicture?: ReadMediaOrders | OrderDirectionEnum;
	carts?: ReadCartOrders | OrderDirectionEnum;
	orders?: ReadOrderOrders | OrderDirectionEnum;
	preferences?: ReadPreferenceOrders | OrderDirectionEnum;
	collaborations?: ReadCollaborationOrders | OrderDirectionEnum;
	affiliationLinks?: ReadAffiliationLinkOrders | OrderDirectionEnum;
	promoCodes?: ReadPromoCodeOrders | OrderDirectionEnum;
	isFollowing?: OrderDirectionEnum;
	hasStory?: OrderDirectionEnum;
	followersCount?: OrderDirectionEnum;
	followingCount?: OrderDirectionEnum;
	postsCount?: OrderDirectionEnum;
	brandsCount?: OrderDirectionEnum;
	engagementCount?: OrderDirectionEnum;
}

const ReadShopperProfileOrdersSchema: v.GenericSchema<ReadShopperProfileOrders> = v.object({
	username: v.optional(OrderDirectionSchema),
	fullName: v.optional(OrderDirectionSchema),
	dateOfBirth: v.optional(OrderDirectionSchema),
	bio: v.optional(OrderDirectionSchema),
	gender: v.nullish(v.enum(GenderEnum)),
	onboardingStep: v.optional(OrderDirectionSchema),
	facebookProfileLink: v.optional(OrderDirectionSchema),
	instagramProfileLink: v.optional(OrderDirectionSchema),
	tiktokProfileLink: v.optional(OrderDirectionSchema),
	isOutfitter: v.optional(OrderDirectionSchema),
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	reviews: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductReviewOrdersSchema)])),
	addresses: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShippingAddressOrdersSchema)])),
	profilePicture: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	carts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
	orders: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
	preferences: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPreferenceOrdersSchema)])),
	collaborations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCollaborationOrdersSchema)])),
	affiliationLinks: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
	promoCodes: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
	isFollowing: v.optional(OrderDirectionSchema),
	hasStory: v.optional(OrderDirectionSchema),
	followersCount: v.optional(OrderDirectionSchema),
	followingCount: v.optional(OrderDirectionSchema),
	postsCount: v.optional(OrderDirectionSchema),
	brandsCount: v.optional(OrderDirectionSchema),
	engagementCount: v.optional(OrderDirectionSchema),
});

export default ReadShopperProfileOrdersSchema;

export type TReadShopperProfileOrdersSchemaOutput = v.InferOutput<typeof ReadShopperProfileOrdersSchema>;
export type TReadShopperProfileOrdersSchemaInput = v.InferInput<typeof ReadShopperProfileOrdersSchema>;
