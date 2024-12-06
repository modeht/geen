import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadPromotionOrdersSchema, { ReadPromotionOrders } from './read-promotion-orders.schema';
import ReadCategoryOrdersSchema, {
	ReadCategoryOrders,
} from '../../categories/generated-schemas/read-category-orders.schema';

import { PromotionStatusEnum } from '../entities/enums';
export class ReadSeasonalPromotionOrders {
	title?: OrderDirectionEnum;
	start?: OrderDirectionEnum;
	end?: OrderDirectionEnum;
	status?: PromotionStatusEnum | null;
	promotions?: ReadPromotionOrders | OrderDirectionEnum;
	subCategories?: ReadCategoryOrders | OrderDirectionEnum;
}

const ReadSeasonalPromotionOrdersSchema: v.GenericSchema<ReadSeasonalPromotionOrders> = v.object({
	title: v.optional(OrderDirectionSchema),
	start: v.optional(OrderDirectionSchema),
	end: v.optional(OrderDirectionSchema),
	status: v.nullish(v.enum(PromotionStatusEnum)),
	promotions: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)])),
	subCategories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
});

export default ReadSeasonalPromotionOrdersSchema;

export type TReadSeasonalPromotionOrdersSchemaOutput = v.InferOutput<typeof ReadSeasonalPromotionOrdersSchema>;
export type TReadSeasonalPromotionOrdersSchemaInput = v.InferInput<typeof ReadSeasonalPromotionOrdersSchema>;
