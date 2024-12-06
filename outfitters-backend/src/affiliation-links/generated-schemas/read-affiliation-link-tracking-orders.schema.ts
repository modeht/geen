import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadAffiliationLinkOrdersSchema, { ReadAffiliationLinkOrders } from './read-affiliation-link-orders.schema';
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema';

export class ReadAffiliationLinkTrackingOrders {
	affiliationLink?: ReadAffiliationLinkOrders | OrderDirectionEnum;
	user?: ReadUserOrders | OrderDirectionEnum;
	referrer?: OrderDirectionEnum;
	country?: OrderDirectionEnum;
	ipAddress?: OrderDirectionEnum;
	userAgent?: OrderDirectionEnum;
}

const ReadAffiliationLinkTrackingOrdersSchema: v.GenericSchema<ReadAffiliationLinkTrackingOrders> = v.object({
	affiliationLink: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
	referrer: v.optional(OrderDirectionSchema),
	country: v.optional(OrderDirectionSchema),
	ipAddress: v.optional(OrderDirectionSchema),
	userAgent: v.optional(OrderDirectionSchema),
});

export default ReadAffiliationLinkTrackingOrdersSchema;

export type TReadAffiliationLinkTrackingOrdersSchemaOutput = v.InferOutput<
	typeof ReadAffiliationLinkTrackingOrdersSchema
>;
export type TReadAffiliationLinkTrackingOrdersSchemaInput = v.InferInput<
	typeof ReadAffiliationLinkTrackingOrdersSchema
>;
