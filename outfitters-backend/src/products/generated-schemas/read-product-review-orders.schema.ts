import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadShopperProfileOrdersSchema, ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import { ReadMediaOrdersSchema, ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from './read-product-orders.schema'



export class ReadProductReviewOrders {shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
stars?: OrderDirectionEnum | undefined;
comment?: OrderDirectionEnum | undefined;
media?: ReadMediaOrders | OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined;
productId?: OrderDirectionEnum | undefined;
shopperId?: OrderDirectionEnum | undefined}

export const ReadProductReviewOrdersSchema: v.GenericSchema<ReadProductReviewOrders> = v.object({shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
stars: v.undefinedable(OrderDirectionSchema),
comment: v.undefinedable(OrderDirectionSchema),
media: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
productId: v.undefinedable(OrderDirectionSchema),
shopperId: v.undefinedable(OrderDirectionSchema)})



export type TReadProductReviewOrdersSchemaOutput = v.InferOutput<typeof ReadProductReviewOrdersSchema>;
export type TReadProductReviewOrdersSchemaInput = v.InferInput<typeof ReadProductReviewOrdersSchema>;
