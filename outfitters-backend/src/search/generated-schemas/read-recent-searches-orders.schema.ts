import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import { searchMode } from '../entities/recent-searches.entity';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';

export class ReadRecentSearchesOrders {
	keyword?: OrderDirectionEnum;
	mode?: searchMode | null;
	user?: ReadUserOrders | OrderDirectionEnum;
	userId?: OrderDirectionEnum;
}

const ReadRecentSearchesOrdersSchema: v.GenericSchema<ReadRecentSearchesOrders> = v.object({
	keyword: v.optional(OrderDirectionSchema),
	mode: v.nullish(v.enum(searchMode)),
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	userId: v.optional(OrderDirectionSchema),
});

export default ReadRecentSearchesOrdersSchema;

export type TReadRecentSearchesOrdersSchemaOutput = v.InferOutput<typeof ReadRecentSearchesOrdersSchema>;
export type TReadRecentSearchesOrdersSchemaInput = v.InferInput<typeof ReadRecentSearchesOrdersSchema>;
