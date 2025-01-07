import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadFavoriteFiltersSchema from './read-favorite-filters.schema';
import ReadFavoriteRelationsSchema from './read-favorite-relations.schema';
import ReadFavoriteOrdersSchema from './read-favorite-orders.schema';
const ReadFavoriteSchema = v.optional(
	v.object({
		filters: v.optional(ReadFavoriteFiltersSchema),
		relations: v.optional(ReadFavoriteRelationsSchema),
		orders: v.optional(ReadFavoriteOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadFavoriteSchema;
export type TReadFavoriteSchemaInput = v.InferInput<typeof ReadFavoriteSchema>;
export type TReadFavoriteSchemaOutput = v.InferOutput<typeof ReadFavoriteSchema>;
