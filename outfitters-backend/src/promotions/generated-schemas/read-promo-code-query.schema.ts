import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadPromoCodeFiltersSchema from './read-promo-code-filters.schema';
import ReadPromoCodeRelationsSchema from './read-promo-code-relations.schema';
import ReadPromoCodeOrdersSchema from './read-promo-code-orders.schema';
const ReadPromoCodeSchema = v.optional(v.object({
filters: v.optional(ReadPromoCodeFiltersSchema),
relations: v.optional(ReadPromoCodeRelationsSchema),
orders: v.optional(ReadPromoCodeOrdersSchema),
pagination: v.optional(ReadPaginationSchema),
}));
export default ReadPromoCodeSchema;
export type TReadPromoCodeSchemaInput = v.InferInput<typeof ReadPromoCodeSchema>;
export type TReadPromoCodeSchemaOutput = v.InferOutput<typeof ReadPromoCodeSchema>;
