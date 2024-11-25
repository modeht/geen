import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadSavedCollectionItemOrdersSchema, ReadSavedCollectionItemOrders } from './read-saved-collection-item-orders.schema'
import { ReadUserOrdersSchema, ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'



export class ReadSavedCollectionOrders {name?: OrderDirectionEnum | undefined;
items?: ReadSavedCollectionItemOrders | OrderDirectionEnum | undefined;
user?: ReadUserOrders | OrderDirectionEnum | undefined;
userId?: OrderDirectionEnum | undefined}

export const ReadSavedCollectionOrdersSchema: v.GenericSchema<ReadSavedCollectionOrders> = v.object({name: v.undefinedable(OrderDirectionSchema),
items: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionItemOrdersSchema)])),
user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
userId: v.undefinedable(OrderDirectionSchema)})



export type TReadSavedCollectionOrdersSchemaOutput = v.InferOutput<typeof ReadSavedCollectionOrdersSchema>;
export type TReadSavedCollectionOrdersSchemaInput = v.InferInput<typeof ReadSavedCollectionOrdersSchema>;
