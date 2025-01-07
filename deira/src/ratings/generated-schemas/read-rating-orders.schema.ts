import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';

export class ReadRatingOrders {
	stars?: OrderDirectionEnum;
	review?: OrderDirectionEnum;
	reviewer?: ReadUserOrders | OrderDirectionEnum;
	reviewed?: ReadUserOrders | OrderDirectionEnum;
}

const ReadRatingOrdersSchema: v.GenericSchema<ReadRatingOrders> = v.object({
	stars: v.optional(OrderDirectionSchema),
	review: v.optional(OrderDirectionSchema),
	reviewer: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	reviewed: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
});

export default ReadRatingOrdersSchema;

export type TReadRatingOrdersSchemaOutput = v.InferOutput<typeof ReadRatingOrdersSchema>;
export type TReadRatingOrdersSchemaInput = v.InferInput<typeof ReadRatingOrdersSchema>;
