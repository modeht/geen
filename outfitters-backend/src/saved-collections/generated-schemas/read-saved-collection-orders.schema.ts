import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadSavedCollectionItemOrdersSchema, {
	ReadSavedCollectionItemOrders,
} from './read-saved-collection-item-orders.schema';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';

export class ReadSavedCollectionOrders {
	name?: OrderDirectionEnum;
	items?: ReadSavedCollectionItemOrders | OrderDirectionEnum;
	user?: ReadUserOrders | OrderDirectionEnum;
	userId?: OrderDirectionEnum;
}

const ReadSavedCollectionOrdersSchema: v.GenericSchema<ReadSavedCollectionOrders> = v.object({
	name: v.optional(OrderDirectionSchema),
	items: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionItemOrdersSchema)])),
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	userId: v.optional(OrderDirectionSchema),
});

export default ReadSavedCollectionOrdersSchema;

export type TReadSavedCollectionOrdersSchemaOutput = v.InferOutput<typeof ReadSavedCollectionOrdersSchema>;
export type TReadSavedCollectionOrdersSchemaInput = v.InferInput<typeof ReadSavedCollectionOrdersSchema>;
