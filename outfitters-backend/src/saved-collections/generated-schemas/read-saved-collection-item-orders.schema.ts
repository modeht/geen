import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadSavedCollectionOrdersSchema, { ReadSavedCollectionOrders } from './read-saved-collection-orders.schema'
import ReadProductOrdersSchema, { ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import ReadPostOrdersSchema, { ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'



export class ReadSavedCollectionItemOrders {savedCollection?: ReadSavedCollectionOrders | OrderDirectionEnum;
product?: ReadProductOrders | OrderDirectionEnum;
post?: ReadPostOrders | OrderDirectionEnum;
savedCollectionId?: OrderDirectionEnum;
productId?: OrderDirectionEnum;
postId?: OrderDirectionEnum;
userId?: OrderDirectionEnum}

const ReadSavedCollectionItemOrdersSchema: v.GenericSchema<ReadSavedCollectionItemOrders> = v.object({savedCollection: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionOrdersSchema)])),
product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
post: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
savedCollectionId: v.optional(OrderDirectionSchema),
productId: v.optional(OrderDirectionSchema),
postId: v.optional(OrderDirectionSchema),
userId: v.optional(OrderDirectionSchema)});

export default ReadSavedCollectionItemOrdersSchema;




export type TReadSavedCollectionItemOrdersSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemOrdersSchema>;
export type TReadSavedCollectionItemOrdersSchemaInput = v.InferInput<typeof ReadSavedCollectionItemOrdersSchema>;
