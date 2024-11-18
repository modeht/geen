import * as v from 'valibot';
import { ReadBrandProfileFiltersSchema } from './read-brand-profile-filters.schema';
import { ReadBrandProfileRelationsSchema } from './read-brand-profile-relations.schema';
export const ReadBrandProfileSchema = v.object({
filters: v.nullish(ReadBrandProfileFiltersSchema),
relations: v.nullish(ReadBrandProfileRelationsSchema),
});
export type TReadBrandProfileSchemaInput = v.InferInput<typeof ReadBrandProfileSchema>;
export type TReadBrandProfileSchemaOutput = v.InferOutput<typeof ReadBrandProfileSchema>;
