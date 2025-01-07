import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadTranslationOrdersSchema, {
	ReadTranslationOrders,
} from '../../translations/generated-schemas/read-translation-orders.schema';
import ReadCategoryOrdersSchema, {
	ReadCategoryOrders,
} from '../../categories/generated-schemas/read-category-orders.schema';
import ReadAdOrdersSchema, { ReadAdOrders } from '../../ads/generated-schemas/read-ad-orders.schema';

export class ReadCategoryFilterOrders {
	translations?: ReadTranslationOrders | OrderDirectionEnum;
	name?: OrderDirectionEnum;
	category?: ReadCategoryOrders | OrderDirectionEnum;
	categories?: ReadCategoryOrders | OrderDirectionEnum;
	ads?: ReadAdOrders | OrderDirectionEnum;
	isArchived?: OrderDirectionEnum;
}

const ReadCategoryFilterOrdersSchema: v.GenericSchema<ReadCategoryFilterOrders> = v.object({
	translations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadTranslationOrdersSchema)])),
	name: v.optional(OrderDirectionSchema),
	category: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	categories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
	ads: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAdOrdersSchema)])),
	isArchived: v.optional(OrderDirectionSchema),
});

export default ReadCategoryFilterOrdersSchema;

export type TReadCategoryFilterOrdersSchemaOutput = v.InferOutput<typeof ReadCategoryFilterOrdersSchema>;
export type TReadCategoryFilterOrdersSchemaInput = v.InferInput<typeof ReadCategoryFilterOrdersSchema>;
