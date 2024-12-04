import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadProductOptionOrdersSchema, { ReadProductOptionOrders } from './read-product-option-orders.schema'
import ReadProductVariantOrdersSchema, { ReadProductVariantOrders } from './read-product-variant-orders.schema'



export class ReadProductOptionValueOrders {value?: OrderDirectionEnum;
optionName?: OrderDirectionEnum;
productId?: OrderDirectionEnum;
option?: ReadProductOptionOrders | OrderDirectionEnum;
variants?: ReadProductVariantOrders | OrderDirectionEnum}

const ReadProductOptionValueOrdersSchema: v.GenericSchema<ReadProductOptionValueOrders> = v.object({value: v.optional(OrderDirectionSchema),
optionName: v.optional(OrderDirectionSchema),
productId: v.optional(OrderDirectionSchema),
option: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOptionOrdersSchema)])),
variants: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)]))});

export default ReadProductOptionValueOrdersSchema;




export type TReadProductOptionValueOrdersSchemaOutput = v.InferOutput<typeof ReadProductOptionValueOrdersSchema>;
export type TReadProductOptionValueOrdersSchemaInput = v.InferInput<typeof ReadProductOptionValueOrdersSchema>;
