import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from '../../users/generated-schemas/read-shopper-profile.schema'
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from './read-product.schema'

export class ReadProductReviewSchemaFilters {shopperProfile?: ReadShopperProfileSchemaFilters | null | undefined;
stars?: GenericComparable<"number"> | null | undefined;
comment?: GenericComparable<"string"> | null | undefined;
media?: ReadMediaSchemaFilters | null | undefined;
product?: ReadProductSchemaFilters | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined}

export const ReadProductReviewSchema: v.GenericSchema<ReadProductReviewSchemaFilters> = v.object({shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
stars: v.nullish(comparable("number")),
comment: v.nullish(comparable("string")),
media: v.nullish(v.lazy(() => ReadMediaSchema)),
product: v.nullish(v.lazy(() => ReadProductSchema)),
productId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number"))})



export type TReadProductReviewSchema = v.InferOutput<typeof ReadProductReviewSchema>
export type TReadProductReviewSchemaInput = v.InferInput<typeof ReadProductReviewSchema>
