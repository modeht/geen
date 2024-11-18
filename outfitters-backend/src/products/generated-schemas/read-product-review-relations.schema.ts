import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from './read-product-relations.schema'

export class ReadProductReviewRelationsSchemaRelations {shopperProfile?: ReadShopperProfileRelationsSchemaRelations | boolean | null | undefined;
media?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
product?: ReadProductRelationsSchemaRelations | boolean | null | undefined}

export const ReadProductReviewRelationsSchema: v.GenericSchema<ReadProductReviewRelationsSchemaRelations> = v.object({shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadProductReviewRelationsSchema = v.InferOutput<typeof ReadProductReviewRelationsSchema>;

export type TReadProductReviewRelationsSchemaInput = v.InferInput<typeof ReadProductReviewRelationsSchema>;
