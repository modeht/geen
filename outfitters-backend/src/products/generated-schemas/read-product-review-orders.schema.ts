import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadShopperProfileOrdersSchema, ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import { ReadMediaOrdersSchema, ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from './read-product-orders.schema'



export class ReadProductReviewOrders {shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
media?: ReadMediaOrders | OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined}

export const ReadProductReviewOrdersSchema: v.GenericSchema<ReadProductReviewOrders> = v.object({shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
media: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)]))})



export type TReadProductReviewOrdersSchemaOutput = v.InferOutput<typeof ReadProductReviewOrdersSchema>;
export type TReadProductReviewOrdersSchemaInput = v.InferInput<typeof ReadProductReviewOrdersSchema>;
