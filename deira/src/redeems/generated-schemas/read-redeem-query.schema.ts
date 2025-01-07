import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadRedeemFiltersSchema from './read-redeem-filters.schema';
import ReadRedeemRelationsSchema from './read-redeem-relations.schema';
import ReadRedeemOrdersSchema from './read-redeem-orders.schema';
const ReadRedeemSchema = v.optional(
	v.object({
		filters: v.optional(ReadRedeemFiltersSchema),
		relations: v.optional(ReadRedeemRelationsSchema),
		orders: v.optional(ReadRedeemOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadRedeemSchema;
export type TReadRedeemSchemaInput = v.InferInput<typeof ReadRedeemSchema>;
export type TReadRedeemSchemaOutput = v.InferOutput<typeof ReadRedeemSchema>;
