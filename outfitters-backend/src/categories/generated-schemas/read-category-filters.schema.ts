import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaFiltersSchema, ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'
import { ReadBrandProfileFiltersSchema, ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'
import { ReadSeasonalPromotionFiltersSchema, ReadSeasonalPromotionFiltersSchemaFilters } from '../../promotions/generated-schemas/read-seasonal-promotion-filters.schema'

export class ReadCategoryFiltersSchemaFilters {name?: GenericComparable<"string"> | null | undefined;
isArchived?: GenericComparable<"bool"> | null | undefined;
media?: ReadMediaFiltersSchemaFilters | null | undefined;
subCategories?: ReadCategoryFiltersSchemaFilters | null | undefined;
superCategory?: ReadCategoryFiltersSchemaFilters | null | undefined;
superCategoryId?: GenericComparable<"number"> | null | undefined;
products?: ReadProductFiltersSchemaFilters | null | undefined;
categorybrandProfiles?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
subCategoriesBrandProfiles?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
seasonalPromotions?: ReadSeasonalPromotionFiltersSchemaFilters | null | undefined}

export const ReadCategoryFiltersSchema: v.GenericSchema<ReadCategoryFiltersSchemaFilters> = v.object({name: v.nullish(comparable("string")),
isArchived: v.nullish(comparable("bool")),
media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
subCategories: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
superCategory: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
superCategoryId: v.nullish(comparable("number")),
products: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
categorybrandProfiles: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
subCategoriesBrandProfiles: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
seasonalPromotions: v.nullish(v.lazy(() => ReadSeasonalPromotionFiltersSchema))})



export type TReadCategorySchemaOutput = v.InferOutput<typeof ReadCategoryFiltersSchema>;
export type TReadCategorySchemaInput = v.InferInput<typeof ReadCategoryFiltersSchema>;
