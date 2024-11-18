import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadOrderItemRelationsSchema, ReadOrderItemRelationsSchemaRelations } from '../../orders/generated-schemas/read-order-item-relations.schema'
import { ReadCartItemsRelationsSchema, ReadCartItemsRelationsSchemaRelations } from '../../carts/generated-schemas/read-cart-items-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from './read-product-relations.schema'
import { ReadProductOptionValueRelationsSchema, ReadProductOptionValueRelationsSchemaRelations } from './read-product-option-value-relations.schema'

export class ReadProductVariantRelationsSchemaRelations {media?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
orderItems?: ReadOrderItemRelationsSchemaRelations | boolean | null | undefined;
carts?: ReadCartItemsRelationsSchemaRelations | boolean | null | undefined;
mainProduct?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
optionValues?: ReadProductOptionValueRelationsSchemaRelations | boolean | null | undefined}

export const ReadProductVariantRelationsSchema: v.GenericSchema<ReadProductVariantRelationsSchemaRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
orderItems: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderItemRelationsSchema)])),
carts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartItemsRelationsSchema)])),
mainProduct: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
optionValues: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductOptionValueRelationsSchema)]))})



export type TReadProductVariantRelationsSchemaOutput = v.InferOutput<typeof ReadProductVariantRelationsSchema>;
export type TReadProductVariantRelationsSchemaInput = v.InferInput<typeof ReadProductVariantRelationsSchema>;
