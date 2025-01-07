import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadBannerFiltersSchema from './read-banner-filters.schema';
import ReadBannerRelationsSchema from './read-banner-relations.schema';
import ReadBannerOrdersSchema from './read-banner-orders.schema';
const ReadBannerSchema = v.optional(
	v.object({
		filters: v.optional(ReadBannerFiltersSchema),
		relations: v.optional(ReadBannerRelationsSchema),
		orders: v.optional(ReadBannerOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadBannerSchema;
export type TReadBannerSchemaInput = v.InferInput<typeof ReadBannerSchema>;
export type TReadBannerSchemaOutput = v.InferOutput<typeof ReadBannerSchema>;
