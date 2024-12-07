import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadTaggedProductOrdersSchema, {
	ReadTaggedProductOrders,
} from '../../products/generated-schemas/read-tagged-product-orders.schema';
import ReadCartItemsOrdersSchema, {
	ReadCartItemsOrders,
} from '../../carts/generated-schemas/read-cart-items-orders.schema';
import ReadAffiliationLinkTrackingOrdersSchema, {
	ReadAffiliationLinkTrackingOrders,
} from './read-affiliation-link-tracking-orders.schema';
import ReadShopperProfileOrdersSchema, {
	ReadShopperProfileOrders,
} from '../../users/generated-schemas/read-shopper-profile-orders.schema';
import ReadProductOrdersSchema, {
	ReadProductOrders,
} from '../../products/generated-schemas/read-product-orders.schema';

export class ReadAffiliationLinkOrders {
	isDisabled?: OrderDirectionEnum;
	url?: OrderDirectionEnum;
	taggedProducts?: ReadTaggedProductOrders | OrderDirectionEnum;
	cartItems?: ReadCartItemsOrders | OrderDirectionEnum;
	affiliationLinkTracking?: ReadAffiliationLinkTrackingOrders | OrderDirectionEnum;
	shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum;
	product?: ReadProductOrders | OrderDirectionEnum;
	productId?: OrderDirectionEnum;
	shopperId?: OrderDirectionEnum;
}

const ReadAffiliationLinkOrdersSchema: v.GenericSchema<ReadAffiliationLinkOrders> = v.object({
	isDisabled: v.optional(OrderDirectionSchema),
	url: v.optional(OrderDirectionSchema),
	taggedProducts: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTaggedProductOrdersSchema)])),
	cartItems: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCartItemsOrdersSchema)])),
	affiliationLinkTracking: v.optional(
		v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkTrackingOrdersSchema)]),
	),
	shopperProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
	product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
	productId: v.optional(OrderDirectionSchema),
	shopperId: v.optional(OrderDirectionSchema),
});

export default ReadAffiliationLinkOrdersSchema;

export type TReadAffiliationLinkOrdersSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkOrdersSchema>;
export type TReadAffiliationLinkOrdersSchemaInput = v.InferInput<typeof ReadAffiliationLinkOrdersSchema>;
