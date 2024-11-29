import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadPromotionOrdersSchema, { ReadPromotionOrders } from './read-promotion-orders.schema'
import ReadCategoryOrdersSchema, { ReadCategoryOrders } from '../../categories/generated-schemas/read-category-orders.schema'


import { PromotionStatusEnum } from '../entities/enums'
export class ReadSeasonalPromotionOrders {title?: OrderDirectionEnum | undefined;
start?: OrderDirectionEnum | undefined;
end?: OrderDirectionEnum | undefined;
status?: PromotionStatusEnum | null | undefined;
promotions?: ReadPromotionOrders | OrderDirectionEnum | undefined;
subCategories?: ReadCategoryOrders | OrderDirectionEnum | undefined}

const ReadSeasonalPromotionOrdersSchema: v.GenericSchema<ReadSeasonalPromotionOrders> = v.object({title: v.undefinedable(OrderDirectionSchema),
start: v.undefinedable(OrderDirectionSchema),
end: v.undefinedable(OrderDirectionSchema),
status: v.nullish(v.enum(PromotionStatusEnum)),
promotions: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)])),
subCategories: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)]))});

export default ReadSeasonalPromotionOrdersSchema;




export type TReadSeasonalPromotionOrdersSchemaOutput = v.InferOutput<typeof ReadSeasonalPromotionOrdersSchema>;
export type TReadSeasonalPromotionOrdersSchemaInput = v.InferInput<typeof ReadSeasonalPromotionOrdersSchema>;
