import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadSavedCollectionFiltersSchema } from './read-saved-collection-filters.schema';
import { ReadSavedCollectionRelationsSchema } from './read-saved-collection-relations.schema';
import { ReadSavedCollectionOrdersSchema } from './read-saved-collection-orders.schema';
export const ReadSavedCollectionSchema = v.object({
filters: v.undefinedable(ReadSavedCollectionFiltersSchema),
relations: v.undefinedable(ReadSavedCollectionRelationsSchema),
orders: v.undefinedable(ReadSavedCollectionOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
});
export type TReadSavedCollectionSchemaInput = v.InferInput<typeof ReadSavedCollectionSchema>;
export type TReadSavedCollectionSchemaOutput = v.InferOutput<typeof ReadSavedCollectionSchema>;
