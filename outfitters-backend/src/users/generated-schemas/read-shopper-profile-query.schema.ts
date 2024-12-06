import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadShopperProfileFiltersSchema from './read-shopper-profile-filters.schema';
import ReadShopperProfileRelationsSchema from './read-shopper-profile-relations.schema';
import ReadShopperProfileOrdersSchema from './read-shopper-profile-orders.schema';
const ReadShopperProfileSchema = v.optional(
	v.object({
		filters: v.optional(ReadShopperProfileFiltersSchema),
		relations: v.optional(ReadShopperProfileRelationsSchema),
		orders: v.optional(ReadShopperProfileOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadShopperProfileSchema;
export type TReadShopperProfileSchemaInput = v.InferInput<typeof ReadShopperProfileSchema>;
export type TReadShopperProfileSchemaOutput = v.InferOutput<typeof ReadShopperProfileSchema>;
