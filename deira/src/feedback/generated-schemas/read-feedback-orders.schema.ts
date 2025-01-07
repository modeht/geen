import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';

export class ReadFeedbackOrders {
	message?: OrderDirectionEnum;
	user?: ReadUserOrders | OrderDirectionEnum;
}

const ReadFeedbackOrdersSchema: v.GenericSchema<ReadFeedbackOrders> = v.object({
	message: v.optional(OrderDirectionSchema),
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
});

export default ReadFeedbackOrdersSchema;

export type TReadFeedbackOrdersSchemaOutput = v.InferOutput<typeof ReadFeedbackOrdersSchema>;
export type TReadFeedbackOrdersSchemaInput = v.InferInput<typeof ReadFeedbackOrdersSchema>;
