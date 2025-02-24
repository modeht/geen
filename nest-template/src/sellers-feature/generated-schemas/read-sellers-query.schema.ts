import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadSellersFiltersSchema from './read-sellers-filters.schema';
import ReadSellersRelationsSchema from './read-sellers-relations.schema';
import ReadSellersOrdersSchema from './read-sellers-orders.schema';
const ReadSellersSchema = v.optional(
	v.object({
		filters: v.optional(ReadSellersFiltersSchema),
		relations: v.optional(ReadSellersRelationsSchema),
		orders: v.optional(ReadSellersOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadSellersSchema;
export type TReadSellersSchemaInput = v.InferInput<typeof ReadSellersSchema>;
export type TReadSellersSchemaOutput = v.InferOutput<typeof ReadSellersSchema>;
