import * as v from 'valibot';
import { ReadShopperProfileFiltersSchema } from './read-shopper-profile-filters.schema';
import { ReadShopperProfileRelationsSchema } from './read-shopper-profile-relations.schema';
export const ReadShopperProfileSchema = v.object({
filters: v.nullish(ReadShopperProfileFiltersSchema),
relations: v.nullish(ReadShopperProfileRelationsSchema),
});
export type TReadShopperProfileSchemaInput = v.InferInput<typeof ReadShopperProfileSchema>;
export type TReadShopperProfileSchemaOutput = v.InferOutput<typeof ReadShopperProfileSchema>;
