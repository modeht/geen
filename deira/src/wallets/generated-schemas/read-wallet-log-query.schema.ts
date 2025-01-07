import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadWalletLogFiltersSchema from './read-wallet-log-filters.schema';
import ReadWalletLogRelationsSchema from './read-wallet-log-relations.schema';
import ReadWalletLogOrdersSchema from './read-wallet-log-orders.schema';
const ReadWalletLogSchema = v.optional(
	v.object({
		filters: v.optional(ReadWalletLogFiltersSchema),
		relations: v.optional(ReadWalletLogRelationsSchema),
		orders: v.optional(ReadWalletLogOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadWalletLogSchema;
export type TReadWalletLogSchemaInput = v.InferInput<typeof ReadWalletLogSchema>;
export type TReadWalletLogSchemaOutput = v.InferOutput<typeof ReadWalletLogSchema>;
