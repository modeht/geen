import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaFiltersSchema, ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import { ReadOrderItemFiltersSchema, ReadOrderItemFiltersSchemaFilters } from '../../orders/generated-schemas/read-order-item-filters.schema'
import { ReadCartItemsFiltersSchema, ReadCartItemsFiltersSchemaFilters } from '../../carts/generated-schemas/read-cart-items-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from './read-product-filters.schema'
import { ReadProductOptionValueFiltersSchema, ReadProductOptionValueFiltersSchemaFilters } from './read-product-option-value-filters.schema'

export class ReadProductVariantFiltersSchemaFilters {isArchived?: GenericComparable<"bool"> | null | undefined;
stock?: GenericComparable<"number"> | null | undefined;
price?: GenericComparable<"number"> | null | undefined;
lastStockUpdate?: GenericComparable<"date"> | null | undefined;
sku?: GenericComparable<"string"> | null | undefined;
media?: ReadMediaFiltersSchemaFilters | null | undefined;
orderItems?: ReadOrderItemFiltersSchemaFilters | null | undefined;
carts?: ReadCartItemsFiltersSchemaFilters | null | undefined;
mainProduct?: ReadProductFiltersSchemaFilters | null | undefined;
optionValues?: ReadProductOptionValueFiltersSchemaFilters | null | undefined;
mainProductId?: GenericComparable<"number"> | null | undefined}

export const ReadProductVariantFiltersSchema: v.GenericSchema<ReadProductVariantFiltersSchemaFilters> = v.object({isArchived: v.nullish(comparable("bool")),
stock: v.nullish(comparable("number")),
price: v.nullish(comparable("number")),
lastStockUpdate: v.nullish(comparable("date")),
sku: v.nullish(comparable("string")),
media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
orderItems: v.nullish(v.lazy(() => ReadOrderItemFiltersSchema)),
carts: v.nullish(v.lazy(() => ReadCartItemsFiltersSchema)),
mainProduct: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
optionValues: v.nullish(v.lazy(() => ReadProductOptionValueFiltersSchema)),
mainProductId: v.nullish(comparable("number"))})



export type TReadProductVariantFiltersSchemaOutput = v.InferOutput<typeof ReadProductVariantFiltersSchema>;
export type TReadProductVariantFiltersSchemaInput = v.InferInput<typeof ReadProductVariantFiltersSchema>;
