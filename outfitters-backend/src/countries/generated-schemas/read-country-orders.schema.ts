import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadMediaOrdersSchema, ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'



export class ReadCountryOrders {name?: OrderDirectionEnum | undefined;
code?: OrderDirectionEnum | undefined;
dialCode?: OrderDirectionEnum | undefined;
isSupported?: OrderDirectionEnum | undefined;
icon?: ReadMediaOrders | OrderDirectionEnum | undefined;
brands?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
iconId?: OrderDirectionEnum | undefined}

export const ReadCountryOrdersSchema: v.GenericSchema<ReadCountryOrders> = v.object({name: v.undefinedable(OrderDirectionSchema),
code: v.undefinedable(OrderDirectionSchema),
dialCode: v.undefinedable(OrderDirectionSchema),
isSupported: v.undefinedable(OrderDirectionSchema),
icon: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
brands: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
iconId: v.undefinedable(OrderDirectionSchema)})



export type TReadCountryOrdersSchemaOutput = v.InferOutput<typeof ReadCountryOrdersSchema>;
export type TReadCountryOrdersSchemaInput = v.InferInput<typeof ReadCountryOrdersSchema>;
