import * as v from 'valibot';
import { ReadCollectionFiltersSchema } from './read-collection-filters.schema';
import { ReadCollectionRelationsSchema } from './read-collection-relations.schema';
import { ReadCollectionOrdersSchema } from './read-collection-orders.schema';
export const ReadCollectionSchema = v.object({
filters: v.undefinedable(ReadCollectionFiltersSchema),
relations: v.undefinedable(ReadCollectionRelationsSchema),
orders: v.undefinedable(ReadCollectionOrdersSchema),
});
export type TReadCollectionSchemaInput = v.InferInput<typeof ReadCollectionSchema>;
export type TReadCollectionSchemaOutput = v.InferOutput<typeof ReadCollectionSchema>;
