import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { searchMode } from '../entities/recent-searches.entity';
import { ReadUserOrdersSchema, ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'



export class ReadRecentSearchesOrders {mode?: searchMode | null | undefined;
user?: ReadUserOrders | OrderDirectionEnum | undefined}

export const ReadRecentSearchesOrdersSchema: v.GenericSchema<ReadRecentSearchesOrders> = v.object({mode: v.nullish(v.enum(searchMode)),
user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)]))})



export type TReadRecentSearchesOrdersSchemaOutput = v.InferOutput<typeof ReadRecentSearchesOrdersSchema>;
export type TReadRecentSearchesOrdersSchemaInput = v.InferInput<typeof ReadRecentSearchesOrdersSchema>;
