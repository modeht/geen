import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadOrderItemRelationsSchema, ReadOrderItemRelations } from '../../orders/generated-schemas/read-order-item-relations.schema'
import { ReadCartItemsRelationsSchema, ReadCartItemsRelations } from '../../carts/generated-schemas/read-cart-items-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from './read-product-relations.schema'
import { ReadProductOptionValueRelationsSchema, ReadProductOptionValueRelations } from './read-product-option-value-relations.schema'



export class ReadProductVariantRelations {media?: ReadMediaRelations | boolean | null | undefined;
orderItems?: ReadOrderItemRelations | boolean | null | undefined;
carts?: ReadCartItemsRelations | boolean | null | undefined;
mainProduct?: ReadProductRelations | boolean | null | undefined;
optionValues?: ReadProductOptionValueRelations | boolean | null | undefined}

export const ReadProductVariantRelationsSchema: v.GenericSchema<ReadProductVariantRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
orderItems: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderItemRelationsSchema)])),
carts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartItemsRelationsSchema)])),
mainProduct: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
optionValues: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductOptionValueRelationsSchema)]))})



export type TReadProductVariantRelationsSchemaOutput = v.InferOutput<typeof ReadProductVariantRelationsSchema>;
export type TReadProductVariantRelationsSchemaInput = v.InferInput<typeof ReadProductVariantRelationsSchema>;
