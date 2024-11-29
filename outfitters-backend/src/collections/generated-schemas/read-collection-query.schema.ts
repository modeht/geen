import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadCollectionFiltersSchema } from './read-collection-filters.schema';
import { ReadCollectionRelationsSchema } from './read-collection-relations.schema';
import { ReadCollectionOrdersSchema } from './read-collection-orders.schema';
const ReadCollectionSchema = v.optional(v.object({
filters: v.undefinedable(ReadCollectionFiltersSchema),
relations: v.undefinedable(ReadCollectionRelationsSchema),
orders: v.undefinedable(ReadCollectionOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
}));
export default ReadCollectionSchema;
export type TReadCollectionSchemaInput = v.InferInput<typeof ReadCollectionSchema>;
export type TReadCollectionSchemaOutput = v.InferOutput<typeof ReadCollectionSchema>;
