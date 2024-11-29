import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadShopperProfileFiltersSchema from './read-shopper-profile-filters.schema';
import ReadShopperProfileRelationsSchema from './read-shopper-profile-relations.schema';
import ReadShopperProfileOrdersSchema from './read-shopper-profile-orders.schema';
const ReadShopperProfileSchema = v.optional(v.object({
filters: v.undefinedable(ReadShopperProfileFiltersSchema),
relations: v.undefinedable(ReadShopperProfileRelationsSchema),
orders: v.undefinedable(ReadShopperProfileOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadShopperProfileSchema;
export type TReadShopperProfileSchemaInput = v.InferInput<typeof ReadShopperProfileSchema>;
export type TReadShopperProfileSchemaOutput = v.InferOutput<typeof ReadShopperProfileSchema>;
