import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from './read-product-relations.schema'



export class ReadProductReviewRelations {shopperProfile?: ReadShopperProfileRelations | boolean | null | undefined;
media?: ReadMediaRelations | boolean | null | undefined;
product?: ReadProductRelations | boolean | null | undefined}

export const ReadProductReviewRelationsSchema: v.GenericSchema<ReadProductReviewRelations> = v.object({shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadProductReviewRelationsSchemaOutput = v.InferOutput<typeof ReadProductReviewRelationsSchema>;
export type TReadProductReviewRelationsSchemaInput = v.InferInput<typeof ReadProductReviewRelationsSchema>;
