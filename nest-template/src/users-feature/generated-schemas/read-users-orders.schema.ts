import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import ReadProfilesOrdersSchema, {
	ReadProfilesOrders,
} from '../../profiles-feature/generated-schemas/read-profiles-orders.schema';

export class ReadUsersOrders {
	profile?: ReadProfilesOrders | OrderDirectionEnum;
}

const ReadUsersOrdersSchema: v.GenericSchema<ReadUsersOrders> = v.object({
	profile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProfilesOrdersSchema)])),
});

export default ReadUsersOrdersSchema;

export type TReadUsersOrdersSchemaOutput = v.InferOutput<typeof ReadUsersOrdersSchema>;
export type TReadUsersOrdersSchemaInput = v.InferInput<typeof ReadUsersOrdersSchema>;
