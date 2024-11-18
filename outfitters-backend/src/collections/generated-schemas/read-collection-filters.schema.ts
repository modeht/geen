import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaFiltersSchema, ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import { ReadBrandProfileFiltersSchema, ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'

export class ReadCollectionFiltersSchemaFilters {name?: GenericComparable<"string"> | null | undefined;
isFeatured?: GenericComparable<"bool"> | null | undefined;
isPublic?: GenericComparable<"bool"> | null | undefined;
cover?: ReadMediaFiltersSchemaFilters | null | undefined;
brand?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
products?: ReadProductFiltersSchemaFilters | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined}

export const ReadCollectionFiltersSchema: v.GenericSchema<ReadCollectionFiltersSchemaFilters> = v.object({name: v.nullish(comparable("string")),
isFeatured: v.nullish(comparable("bool")),
isPublic: v.nullish(comparable("bool")),
cover: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
products: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
brandId: v.nullish(comparable("number"))})



export type TReadCollectionSchemaOutput = v.InferOutput<typeof ReadCollectionFiltersSchema>;
export type TReadCollectionSchemaInput = v.InferInput<typeof ReadCollectionFiltersSchema>;
