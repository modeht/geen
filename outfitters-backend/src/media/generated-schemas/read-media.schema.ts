import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadMediaFiltersSchema } from './read-media-filters.schema';
import { ReadMediaRelationsSchema } from './read-media-relations.schema';
import { ReadMediaOrdersSchema } from './read-media-orders.schema';
export const ReadMediaSchema = v.object({
filters: v.undefinedable(ReadMediaFiltersSchema),
relations: v.undefinedable(ReadMediaRelationsSchema),
orders: v.undefinedable(ReadMediaOrdersSchema),
pagination: v.undefinedable(ReadPaginationSchema),
});
export type TReadMediaSchemaInput = v.InferInput<typeof ReadMediaSchema>;
export type TReadMediaSchemaOutput = v.InferOutput<typeof ReadMediaSchema>;
