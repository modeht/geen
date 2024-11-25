import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadProductOrdersSchema, ReadProductOrders } from './read-product-orders.schema'
import { ReadProductOptionValueOrdersSchema, ReadProductOptionValueOrders } from './read-product-option-value-orders.schema'



export class ReadProductOptionOrders {name?: OrderDirectionEnum | undefined;
productId?: OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined;
values?: ReadProductOptionValueOrders | OrderDirectionEnum | undefined}

export const ReadProductOptionOrdersSchema: v.GenericSchema<ReadProductOptionOrders> = v.object({name: v.undefinedable(OrderDirectionSchema),
productId: v.undefinedable(OrderDirectionSchema),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
values: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOptionValueOrdersSchema)]))})



export type TReadProductOptionOrdersSchemaOutput = v.InferOutput<typeof ReadProductOptionOrdersSchema>;
export type TReadProductOptionOrdersSchemaInput = v.InferInput<typeof ReadProductOptionOrdersSchema>;
