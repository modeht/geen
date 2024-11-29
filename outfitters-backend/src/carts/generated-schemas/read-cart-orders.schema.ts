import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { CartStatus } from '../entities/cart.entity';
import ReadOrderOrdersSchema, { ReadOrderOrders } from '../../orders/generated-schemas/read-order-orders.schema'
import ReadCartItemsOrdersSchema, { ReadCartItemsOrders } from './read-cart-items-orders.schema'
import ReadShopperProfileOrdersSchema, { ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import ReadPromoCodeOrdersSchema, { ReadPromoCodeOrders } from '../../promotions/generated-schemas/read-promo-code-orders.schema'



export class ReadCartOrders {status?: CartStatus | null | undefined;
order?: ReadOrderOrders | OrderDirectionEnum | undefined;
items?: ReadCartItemsOrders | OrderDirectionEnum | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
promoCode?: ReadPromoCodeOrders | OrderDirectionEnum | undefined;
promoCodeId?: OrderDirectionEnum | undefined;
shopperId?: OrderDirectionEnum | undefined}

const ReadCartOrdersSchema: v.GenericSchema<ReadCartOrders> = v.object({status: v.nullish(v.enum(CartStatus)),
order: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderOrdersSchema)])),
items: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartItemsOrdersSchema)])),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
promoCode: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
promoCodeId: v.undefinedable(OrderDirectionSchema),
shopperId: v.undefinedable(OrderDirectionSchema)});

export default ReadCartOrdersSchema;




export type TReadCartOrdersSchemaOutput = v.InferOutput<typeof ReadCartOrdersSchema>;
export type TReadCartOrdersSchemaInput = v.InferInput<typeof ReadCartOrdersSchema>;
