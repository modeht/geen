import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadTaggedProductOrdersSchema, ReadTaggedProductOrders } from '../../products/generated-schemas/read-tagged-product-orders.schema'
import { ReadCartItemsOrdersSchema, ReadCartItemsOrders } from '../../carts/generated-schemas/read-cart-items-orders.schema'
import { ReadAffiliationLinkTrackingOrdersSchema, ReadAffiliationLinkTrackingOrders } from './read-affiliation-link-tracking-orders.schema'
import { ReadShopperProfileOrdersSchema, ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'



export class ReadAffiliationLinkOrders {isDisabled?: OrderDirectionEnum | undefined;
url?: OrderDirectionEnum | undefined;
taggedProducts?: ReadTaggedProductOrders | OrderDirectionEnum | undefined;
cartItems?: ReadCartItemsOrders | OrderDirectionEnum | undefined;
affiliationLinkTracking?: ReadAffiliationLinkTrackingOrders | OrderDirectionEnum | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined;
productId?: OrderDirectionEnum | undefined;
shopperId?: OrderDirectionEnum | undefined}

export const ReadAffiliationLinkOrdersSchema: v.GenericSchema<ReadAffiliationLinkOrders> = v.object({isDisabled: v.undefinedable(OrderDirectionSchema),
url: v.undefinedable(OrderDirectionSchema),
taggedProducts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadTaggedProductOrdersSchema)])),
cartItems: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartItemsOrdersSchema)])),
affiliationLinkTracking: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkTrackingOrdersSchema)])),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
productId: v.undefinedable(OrderDirectionSchema),
shopperId: v.undefinedable(OrderDirectionSchema)})



export type TReadAffiliationLinkOrdersSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkOrdersSchema>;
export type TReadAffiliationLinkOrdersSchemaInput = v.InferInput<typeof ReadAffiliationLinkOrdersSchema>;
