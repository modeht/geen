import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import { CartStatus } from '../entities/cart.entity';
import ReadOrderOrdersSchema, { ReadOrderOrders } from '../../orders/generated-schemas/read-order-orders.schema';
import ReadCartItemsOrdersSchema, { ReadCartItemsOrders } from './read-cart-items-orders.schema';
import ReadShopperProfileOrdersSchema, {
	ReadShopperProfileOrders,
} from '../../users/generated-schemas/read-shopper-profile-orders.schema';
import ReadPromoCodeOrdersSchema, {
	ReadPromoCodeOrders,
} from '../../promotions/generated-schemas/read-promo-code-orders.schema';

export class ReadCartOrders {
	status?: CartStatus | null;
	order?: ReadOrderOrders | OrderDirectionEnum;
	items?: ReadCartItemsOrders | OrderDirectionEnum;
	shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum;
	promoCode?: ReadPromoCodeOrders | OrderDirectionEnum;
	promoCodeId?: OrderDirectionEnum;
	shopperId?: OrderDirectionEnum;
}

const ReadCartOrdersSchema: v.GenericSchema<ReadCartOrders> = v.object({
	status: v.nullish(v.enum(CartStatus)),
	order: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
	items: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCartItemsOrdersSchema)])),
	shopperProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
	promoCode: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
	promoCodeId: v.optional(OrderDirectionSchema),
	shopperId: v.optional(OrderDirectionSchema),
});

export default ReadCartOrdersSchema;

export type TReadCartOrdersSchemaOutput = v.InferOutput<typeof ReadCartOrdersSchema>;
export type TReadCartOrdersSchemaInput = v.InferInput<typeof ReadCartOrdersSchema>;
