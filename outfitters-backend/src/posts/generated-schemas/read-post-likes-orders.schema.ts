import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadPostOrdersSchema, { ReadPostOrders } from './read-post-orders.schema'



export class ReadPostLikesOrders {user?: ReadUserOrders | OrderDirectionEnum;
post?: ReadPostOrders | OrderDirectionEnum;
userId?: OrderDirectionEnum;
postId?: OrderDirectionEnum}

const ReadPostLikesOrdersSchema: v.GenericSchema<ReadPostLikesOrders> = v.object({user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
post: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
userId: v.optional(OrderDirectionSchema),
postId: v.optional(OrderDirectionSchema)});

export default ReadPostLikesOrdersSchema;




export type TReadPostLikesOrdersSchemaOutput = v.InferOutput<typeof ReadPostLikesOrdersSchema>;
export type TReadPostLikesOrdersSchemaInput = v.InferInput<typeof ReadPostLikesOrdersSchema>;
