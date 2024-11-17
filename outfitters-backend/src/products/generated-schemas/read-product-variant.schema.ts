import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadOrderItemSchema, ReadOrderItemSchemaFilters } from '../../orders/generated-schemas/read-order-item.schema'
import { ReadCartItemsSchema, ReadCartItemsSchemaFilters } from '../../carts/generated-schemas/read-cart-items.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from './read-product.schema'
import { ReadProductOptionValueSchema, ReadProductOptionValueSchemaFilters } from './read-product-option-value.schema'

export class ReadProductVariantSchemaFilters {isArchived?: GenericComparable<"bool"> | null | undefined;
stock?: GenericComparable<"number"> | null | undefined;
price?: GenericComparable<"number"> | null | undefined;
lastStockUpdate?: GenericComparable<"date"> | null | undefined;
sku?: GenericComparable<"string"> | null | undefined;
media?: ReadMediaSchemaFilters | null | undefined;
orderItems?: ReadOrderItemSchemaFilters | null | undefined;
carts?: ReadCartItemsSchemaFilters | null | undefined;
mainProduct?: ReadProductSchemaFilters | null | undefined;
optionValues?: ReadProductOptionValueSchemaFilters | null | undefined;
mainProductId?: GenericComparable<"number"> | null | undefined}

export const ReadProductVariantSchema: v.GenericSchema<ReadProductVariantSchemaFilters> = v.object({isArchived: v.nullish(comparable("bool")),
stock: v.nullish(comparable("number")),
price: v.nullish(comparable("number")),
lastStockUpdate: v.nullish(comparable("date")),
sku: v.nullish(comparable("string")),
media: v.nullish(v.lazy(() => ReadMediaSchema)),
orderItems: v.nullish(v.lazy(() => ReadOrderItemSchema)),
carts: v.nullish(v.lazy(() => ReadCartItemsSchema)),
mainProduct: v.nullish(v.lazy(() => ReadProductSchema)),
optionValues: v.nullish(v.lazy(() => ReadProductOptionValueSchema)),
mainProductId: v.nullish(comparable("number"))})



export type TReadProductVariantSchema = v.InferOutput<typeof ReadProductVariantSchema>
export type TReadProductVariantSchemaInput = v.InferInput<typeof ReadProductVariantSchema>
