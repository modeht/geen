import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadMediaFiltersSchema, { ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import ReadBrandProfileFiltersSchema, { ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'
import ReadProductFiltersSchema, { ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'



export class ReadCollectionFiltersSchemaFilters {name?: GenericComparable<"string"> | null;
isFeatured?: GenericComparable<"bool"> | null;
isPublic?: GenericComparable<"bool"> | null;
cover?: ReadMediaFiltersSchemaFilters | null;
brand?: ReadBrandProfileFiltersSchemaFilters | null;
products?: ReadProductFiltersSchemaFilters | null;
brandId?: GenericComparable<"number"> | null}

const ReadCollectionFiltersSchema: v.GenericSchema<ReadCollectionFiltersSchemaFilters> = v.object({name: v.nullish(comparable("string")),
isFeatured: v.nullish(comparable("bool")),
isPublic: v.nullish(comparable("bool")),
cover: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
products: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
brandId: v.nullish(comparable("number"))});

export default ReadCollectionFiltersSchema;




export type TReadCollectionFiltersSchemaOutput = v.InferOutput<typeof ReadCollectionFiltersSchema>;
export type TReadCollectionFiltersSchemaInput = v.InferInput<typeof ReadCollectionFiltersSchema>;
