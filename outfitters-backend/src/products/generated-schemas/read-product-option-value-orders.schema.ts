import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadProductOptionOrdersSchema, ReadProductOptionOrders } from './read-product-option-orders.schema'
import { ReadProductVariantOrdersSchema, ReadProductVariantOrders } from './read-product-variant-orders.schema'



export class ReadProductOptionValueOrders {option?: ReadProductOptionOrders | OrderDirectionEnum | undefined;
variants?: ReadProductVariantOrders | OrderDirectionEnum | undefined}

export const ReadProductOptionValueOrdersSchema: v.GenericSchema<ReadProductOptionValueOrders> = v.object({option: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOptionOrdersSchema)])),
variants: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)]))})



export type TReadProductOptionValueOrdersSchemaOutput = v.InferOutput<typeof ReadProductOptionValueOrdersSchema>;
export type TReadProductOptionValueOrdersSchemaInput = v.InferInput<typeof ReadProductOptionValueOrdersSchema>;
