import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadStoryOrdersSchema, { ReadStoryOrders } from './read-story-orders.schema'



export class ReadStoryLikesOrders {user?: ReadUserOrders | OrderDirectionEnum | undefined;
story?: ReadStoryOrders | OrderDirectionEnum | undefined;
userId?: OrderDirectionEnum | undefined;
storyId?: OrderDirectionEnum | undefined}

const ReadStoryLikesOrdersSchema: v.GenericSchema<ReadStoryLikesOrders> = v.object({user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
story: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
userId: v.undefinedable(OrderDirectionSchema),
storyId: v.undefinedable(OrderDirectionSchema)});

export default ReadStoryLikesOrdersSchema;




export type TReadStoryLikesOrdersSchemaOutput = v.InferOutput<typeof ReadStoryLikesOrdersSchema>;
export type TReadStoryLikesOrdersSchemaInput = v.InferInput<typeof ReadStoryLikesOrdersSchema>;
