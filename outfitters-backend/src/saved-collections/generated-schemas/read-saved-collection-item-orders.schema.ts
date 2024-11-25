import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadSavedCollectionOrdersSchema, ReadSavedCollectionOrders } from './read-saved-collection-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import { ReadPostOrdersSchema, ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'



export class ReadSavedCollectionItemOrders {savedCollection?: ReadSavedCollectionOrders | OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined;
post?: ReadPostOrders | OrderDirectionEnum | undefined;
savedCollectionId?: OrderDirectionEnum | undefined;
productId?: OrderDirectionEnum | undefined;
postId?: OrderDirectionEnum | undefined;
userId?: OrderDirectionEnum | undefined}

export const ReadSavedCollectionItemOrdersSchema: v.GenericSchema<ReadSavedCollectionItemOrders> = v.object({savedCollection: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionOrdersSchema)])),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
post: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
savedCollectionId: v.undefinedable(OrderDirectionSchema),
productId: v.undefinedable(OrderDirectionSchema),
postId: v.undefinedable(OrderDirectionSchema),
userId: v.undefinedable(OrderDirectionSchema)})



export type TReadSavedCollectionItemOrdersSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemOrdersSchema>;
export type TReadSavedCollectionItemOrdersSchemaInput = v.InferInput<typeof ReadSavedCollectionItemOrdersSchema>;
