import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadWalletFiltersSchema from './read-wallet-filters.schema';
import ReadWalletRelationsSchema from './read-wallet-relations.schema';
import ReadWalletOrdersSchema from './read-wallet-orders.schema';
const ReadWalletSchema = v.optional(
	v.object({
		filters: v.optional(ReadWalletFiltersSchema),
		relations: v.optional(ReadWalletRelationsSchema),
		orders: v.optional(ReadWalletOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadWalletSchema;
export type TReadWalletSchemaInput = v.InferInput<typeof ReadWalletSchema>;
export type TReadWalletSchemaOutput = v.InferOutput<typeof ReadWalletSchema>;
