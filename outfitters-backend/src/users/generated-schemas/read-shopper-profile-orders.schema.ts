import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { GenderEnum } from '../entities/shopper-profile.entity';
import { ReadUserOrdersSchema, ReadUserOrders } from './read-user-orders.schema'
import { ReadProductReviewOrdersSchema, ReadProductReviewOrders } from '../../products/generated-schemas/read-product-review-orders.schema'
import { ReadShippingAddressOrdersSchema, ReadShippingAddressOrders } from './read-shipping-address-orders.schema'
import { ReadMediaOrdersSchema, ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import { ReadCartOrdersSchema, ReadCartOrders } from '../../carts/generated-schemas/read-cart-orders.schema'
import { ReadOrderOrdersSchema, ReadOrderOrders } from '../../orders/generated-schemas/read-order-orders.schema'
import { ReadPreferenceOrdersSchema, ReadPreferenceOrders } from '../../preferences/generated-schemas/read-preference-orders.schema'
import { ReadCollaborationOrdersSchema, ReadCollaborationOrders } from '../../collaborations/generated-schemas/read-collaboration-orders.schema'
import { ReadAffiliationLinkOrdersSchema, ReadAffiliationLinkOrders } from '../../affiliation-links/generated-schemas/read-affiliation-link-orders.schema'
import { ReadPromoCodeOrdersSchema, ReadPromoCodeOrders } from '../../promotions/generated-schemas/read-promo-code-orders.schema'



export class ReadShopperProfileOrders {gender?: GenderEnum | null | undefined;
user?: ReadUserOrders | OrderDirectionEnum | undefined;
reviews?: ReadProductReviewOrders | OrderDirectionEnum | undefined;
addresses?: ReadShippingAddressOrders | OrderDirectionEnum | undefined;
profilePicture?: ReadMediaOrders | OrderDirectionEnum | undefined;
carts?: ReadCartOrders | OrderDirectionEnum | undefined;
orders?: ReadOrderOrders | OrderDirectionEnum | undefined;
preferences?: ReadPreferenceOrders | OrderDirectionEnum | undefined;
collaborations?: ReadCollaborationOrders | OrderDirectionEnum | undefined;
affiliationLinks?: ReadAffiliationLinkOrders | OrderDirectionEnum | undefined;
promoCodes?: ReadPromoCodeOrders | OrderDirectionEnum | undefined}

export const ReadShopperProfileOrdersSchema: v.GenericSchema<ReadShopperProfileOrders> = v.object({gender: v.nullish(v.enum(GenderEnum)),
user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
reviews: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductReviewOrdersSchema)])),
addresses: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShippingAddressOrdersSchema)])),
profilePicture: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
carts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
orders: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
preferences: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPreferenceOrdersSchema)])),
collaborations: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCollaborationOrdersSchema)])),
affiliationLinks: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
promoCodes: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)]))})



export type TReadShopperProfileOrdersSchemaOutput = v.InferOutput<typeof ReadShopperProfileOrdersSchema>;
export type TReadShopperProfileOrdersSchemaInput = v.InferInput<typeof ReadShopperProfileOrdersSchema>;
