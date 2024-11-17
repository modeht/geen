import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from '../../users/generated-schemas/read-brand-profile.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'

export class ReadCollectionSchemaFilters {name?: GenericComparable<"string"> | null | undefined;
isFeatured?: GenericComparable<"bool"> | null | undefined;
isPublic?: GenericComparable<"bool"> | null | undefined;
cover?: ReadMediaSchemaFilters | null | undefined;
brand?: ReadBrandProfileSchemaFilters | null | undefined;
products?: ReadProductSchemaFilters | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined}

export const ReadCollectionSchema: v.GenericSchema<ReadCollectionSchemaFilters> = v.object({name: v.nullish(comparable("string")),
isFeatured: v.nullish(comparable("bool")),
isPublic: v.nullish(comparable("bool")),
cover: v.nullish(v.lazy(() => ReadMediaSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
products: v.nullish(v.lazy(() => ReadProductSchema)),
brandId: v.nullish(comparable("number"))})



export type TReadCollectionSchema = v.InferOutput<typeof ReadCollectionSchema>
export type TReadCollectionSchemaInput = v.InferInput<typeof ReadCollectionSchema>
