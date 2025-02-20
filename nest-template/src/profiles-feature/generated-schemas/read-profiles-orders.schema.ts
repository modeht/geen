import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadUsersOrdersSchema, { ReadUsersOrders } from '../../users-feature/generated-schemas/read-users-orders.schema';

export class ReadProfilesOrders {
	user?: ReadUsersOrders | OrderDirectionEnum;
}

const ReadProfilesOrdersSchema: v.GenericSchema<ReadProfilesOrders> = v.object({
	user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUsersOrdersSchema)])),
});

export default ReadProfilesOrdersSchema;

export type TReadProfilesOrdersSchemaOutput = v.InferOutput<typeof ReadProfilesOrdersSchema>;
export type TReadProfilesOrdersSchemaInput = v.InferInput<typeof ReadProfilesOrdersSchema>;
