import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadPostOrdersSchema, { ReadPostOrders } from './read-post-orders.schema'



export class ReadPostLikesOrders {user?: ReadUserOrders | OrderDirectionEnum | undefined;
post?: ReadPostOrders | OrderDirectionEnum | undefined;
userId?: OrderDirectionEnum | undefined;
postId?: OrderDirectionEnum | undefined}

const ReadPostLikesOrdersSchema: v.GenericSchema<ReadPostLikesOrders> = v.object({user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
post: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
userId: v.undefinedable(OrderDirectionSchema),
postId: v.undefinedable(OrderDirectionSchema)});

export default ReadPostLikesOrdersSchema;




export type TReadPostLikesOrdersSchemaOutput = v.InferOutput<typeof ReadPostLikesOrdersSchema>;
export type TReadPostLikesOrdersSchemaInput = v.InferInput<typeof ReadPostLikesOrdersSchema>;
