import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadProductOptionValueFiltersSchema from './read-product-option-value-filters.schema';
import ReadProductOptionValueRelationsSchema from './read-product-option-value-relations.schema';
import ReadProductOptionValueOrdersSchema from './read-product-option-value-orders.schema';
const ReadProductOptionValueSchema = v.optional(
	v.object({
		filters: v.optional(ReadProductOptionValueFiltersSchema),
		relations: v.optional(ReadProductOptionValueRelationsSchema),
		orders: v.optional(ReadProductOptionValueOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadProductOptionValueSchema;
export type TReadProductOptionValueSchemaInput = v.InferInput<typeof ReadProductOptionValueSchema>;
export type TReadProductOptionValueSchemaOutput = v.InferOutput<typeof ReadProductOptionValueSchema>;
