import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadProductOptionOrdersSchema, { ReadProductOptionOrders } from './read-product-option-orders.schema'
import ReadProductVariantOrdersSchema, { ReadProductVariantOrders } from './read-product-variant-orders.schema'



export class ReadProductOptionValueOrders {value?: OrderDirectionEnum | undefined;
optionName?: OrderDirectionEnum | undefined;
productId?: OrderDirectionEnum | undefined;
option?: ReadProductOptionOrders | OrderDirectionEnum | undefined;
variants?: ReadProductVariantOrders | OrderDirectionEnum | undefined}

const ReadProductOptionValueOrdersSchema: v.GenericSchema<ReadProductOptionValueOrders> = v.object({value: v.undefinedable(OrderDirectionSchema),
optionName: v.undefinedable(OrderDirectionSchema),
productId: v.undefinedable(OrderDirectionSchema),
option: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOptionOrdersSchema)])),
variants: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)]))});

export default ReadProductOptionValueOrdersSchema;




export type TReadProductOptionValueOrdersSchemaOutput = v.InferOutput<typeof ReadProductOptionValueOrdersSchema>;
export type TReadProductOptionValueOrdersSchemaInput = v.InferInput<typeof ReadProductOptionValueOrdersSchema>;
