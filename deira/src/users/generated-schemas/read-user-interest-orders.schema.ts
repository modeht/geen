import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from './read-user-orders.schema';
import ReadCategoryOrdersSchema, {
	ReadCategoryOrders,
} from '../../categories/generated-schemas/read-category-orders.schema';

export class ReadUserInterestOrders {
	user?: ReadUserOrders | OrderDirectionEnum;
	userId?: OrderDirectionEnum;
	category?: ReadCategoryOrders | OrderDirectionEnum;
	categoryId?: OrderDirectionEnum;
	count?: OrderDirectionEnum;
}

const ReadUserInterestOrdersSchema: v.GenericSchema<ReadUserInterestOrders> = v.object({
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	userId: v.optional(OrderDirectionSchema),
	category: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	categoryId: v.optional(OrderDirectionSchema),
	count: v.optional(OrderDirectionSchema),
});

export default ReadUserInterestOrdersSchema;

export type TReadUserInterestOrdersSchemaOutput = v.InferOutput<typeof ReadUserInterestOrdersSchema>;
export type TReadUserInterestOrdersSchemaInput = v.InferInput<typeof ReadUserInterestOrdersSchema>;
