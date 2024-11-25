import * as v from 'valibot';
import { ReadPromoCodeFiltersSchema } from './read-promo-code-filters.schema';
import { ReadPromoCodeRelationsSchema } from './read-promo-code-relations.schema';
import { ReadPromoCodeOrdersSchema } from './read-promo-code-orders.schema';
export const ReadPromoCodeSchema = v.object({
filters: v.undefinedable(ReadPromoCodeFiltersSchema),
relations: v.undefinedable(ReadPromoCodeRelationsSchema),
orders: v.undefinedable(ReadPromoCodeOrdersSchema),
});
export type TReadPromoCodeSchemaInput = v.InferInput<typeof ReadPromoCodeSchema>;
export type TReadPromoCodeSchemaOutput = v.InferOutput<typeof ReadPromoCodeSchema>;
