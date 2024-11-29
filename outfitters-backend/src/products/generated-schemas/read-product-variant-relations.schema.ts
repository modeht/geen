import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadMediaRelationsSchema, { ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import ReadOrderItemRelationsSchema, { ReadOrderItemRelations } from '../../orders/generated-schemas/read-order-item-relations.schema'
import ReadCartItemsRelationsSchema, { ReadCartItemsRelations } from '../../carts/generated-schemas/read-cart-items-relations.schema'
import ReadProductRelationsSchema, { ReadProductRelations } from './read-product-relations.schema'
import ReadProductOptionValueRelationsSchema, { ReadProductOptionValueRelations } from './read-product-option-value-relations.schema'



export class ReadProductVariantRelations {media?: ReadMediaRelations | string | boolean | undefined;
orderItems?: ReadOrderItemRelations | string | boolean | undefined;
carts?: ReadCartItemsRelations | string | boolean | undefined;
mainProduct?: ReadProductRelations | string | boolean | undefined;
optionValues?: ReadProductOptionValueRelations | string | boolean | undefined}

const ReadProductVariantRelationsSchema: v.GenericSchema<ReadProductVariantRelations> = v.object({media: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
orderItems: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadOrderItemRelationsSchema)])),
carts: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCartItemsRelationsSchema)])),
mainProduct: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)])),
optionValues: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductOptionValueRelationsSchema)]))});

export default ReadProductVariantRelationsSchema;




export type TReadProductVariantRelationsSchemaOutput = v.InferOutput<typeof ReadProductVariantRelationsSchema>;
export type TReadProductVariantRelationsSchemaInput = v.InferInput<typeof ReadProductVariantRelationsSchema>;
