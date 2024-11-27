import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadSeasonalPromotionFiltersSchema } from './read-seasonal-promotion-filters.schema';
import { ReadSeasonalPromotionRelationsSchema } from './read-seasonal-promotion-relations.schema';
import { ReadSeasonalPromotionOrdersSchema } from './read-seasonal-promotion-orders.schema';
export const ReadSeasonalPromotionSchema = v.object({
filters: v.undefinedable(ReadSeasonalPromotionFiltersSchema),
relations: v.undefinedable(ReadSeasonalPromotionRelationsSchema),
orders: v.undefinedable(ReadSeasonalPromotionOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
});
export type TReadSeasonalPromotionSchemaInput = v.InferInput<typeof ReadSeasonalPromotionSchema>;
export type TReadSeasonalPromotionSchemaOutput = v.InferOutput<typeof ReadSeasonalPromotionSchema>;
