import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadCartOrdersSchema, { ReadCartOrders } from './read-cart-orders.schema';
import ReadProductOrdersSchema, {
	ReadProductOrders,
} from '../../products/generated-schemas/read-product-orders.schema';
import ReadProductVariantOrdersSchema, {
	ReadProductVariantOrders,
} from '../../products/generated-schemas/read-product-variant-orders.schema';
import ReadAffiliationLinkOrdersSchema, {
	ReadAffiliationLinkOrders,
} from '../../affiliation-links/generated-schemas/read-affiliation-link-orders.schema';

export class ReadCartItemsOrders {
	quantity?: OrderDirectionEnum;
	cart?: ReadCartOrders | OrderDirectionEnum;
	product?: ReadProductOrders | OrderDirectionEnum;
	variant?: ReadProductVariantOrders | OrderDirectionEnum;
	affiliationLink?: ReadAffiliationLinkOrders | OrderDirectionEnum;
	cartId?: OrderDirectionEnum;
	productId?: OrderDirectionEnum;
	variantId?: OrderDirectionEnum;
	affiliationLinkId?: OrderDirectionEnum;
	totalPrice?: OrderDirectionEnum;
	totalDiscountedPrice?: OrderDirectionEnum;
	promoCodeApplied?: OrderDirectionEnum;
	appliedpromotionsIds?: OrderDirectionEnum;
}

const ReadCartItemsOrdersSchema: v.GenericSchema<ReadCartItemsOrders> = v.object({
	quantity: v.optional(OrderDirectionSchema),
	cart: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
	product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
	variant: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)])),
	affiliationLink: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
	cartId: v.optional(OrderDirectionSchema),
	productId: v.optional(OrderDirectionSchema),
	variantId: v.optional(OrderDirectionSchema),
	affiliationLinkId: v.optional(OrderDirectionSchema),
	totalPrice: v.optional(OrderDirectionSchema),
	totalDiscountedPrice: v.optional(OrderDirectionSchema),
	promoCodeApplied: v.optional(OrderDirectionSchema),
	appliedpromotionsIds: v.optional(OrderDirectionSchema),
});

export default ReadCartItemsOrdersSchema;

export type TReadCartItemsOrdersSchemaOutput = v.InferOutput<typeof ReadCartItemsOrdersSchema>;
export type TReadCartItemsOrdersSchemaInput = v.InferInput<typeof ReadCartItemsOrdersSchema>;
