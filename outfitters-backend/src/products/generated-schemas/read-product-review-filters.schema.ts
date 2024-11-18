import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadShopperProfileFiltersSchema, ReadShopperProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-shopper-profile-filters.schema'
import { ReadMediaFiltersSchema, ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from './read-product-filters.schema'

export class ReadProductReviewFiltersSchemaFilters {shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null | undefined;
stars?: GenericComparable<"number"> | null | undefined;
comment?: GenericComparable<"string"> | null | undefined;
media?: ReadMediaFiltersSchemaFilters | null | undefined;
product?: ReadProductFiltersSchemaFilters | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined}

export const ReadProductReviewFiltersSchema: v.GenericSchema<ReadProductReviewFiltersSchemaFilters> = v.object({shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
stars: v.nullish(comparable("number")),
comment: v.nullish(comparable("string")),
media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
productId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number"))})



export type TReadProductReviewFiltersSchemaOutput = v.InferOutput<typeof ReadProductReviewFiltersSchema>;
export type TReadProductReviewFiltersSchemaInput = v.InferInput<typeof ReadProductReviewFiltersSchema>;
