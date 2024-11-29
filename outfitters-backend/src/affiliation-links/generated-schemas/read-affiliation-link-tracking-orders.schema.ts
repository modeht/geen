import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadAffiliationLinkOrdersSchema, { ReadAffiliationLinkOrders } from './read-affiliation-link-orders.schema'
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'



export class ReadAffiliationLinkTrackingOrders {affiliationLink?: ReadAffiliationLinkOrders | OrderDirectionEnum | undefined;
user?: ReadUserOrders | OrderDirectionEnum | undefined;
referrer?: OrderDirectionEnum | undefined;
country?: OrderDirectionEnum | undefined;
ipAddress?: OrderDirectionEnum | undefined;
userAgent?: OrderDirectionEnum | undefined}

const ReadAffiliationLinkTrackingOrdersSchema: v.GenericSchema<ReadAffiliationLinkTrackingOrders> = v.object({affiliationLink: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
referrer: v.undefinedable(OrderDirectionSchema),
country: v.undefinedable(OrderDirectionSchema),
ipAddress: v.undefinedable(OrderDirectionSchema),
userAgent: v.undefinedable(OrderDirectionSchema)});

export default ReadAffiliationLinkTrackingOrdersSchema;




export type TReadAffiliationLinkTrackingOrdersSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkTrackingOrdersSchema>;
export type TReadAffiliationLinkTrackingOrdersSchemaInput = v.InferInput<typeof ReadAffiliationLinkTrackingOrdersSchema>;
