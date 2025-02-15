import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';

export class ReadUsersOrders {
	name?: OrderDirectionEnum;
}

const ReadUsersOrdersSchema: v.GenericSchema<ReadUsersOrders> = v.object({ name: v.optional(OrderDirectionSchema) });

export default ReadUsersOrdersSchema;

export type TReadUsersOrdersSchemaOutput = v.InferOutput<typeof ReadUsersOrdersSchema>;
export type TReadUsersOrdersSchemaInput = v.InferInput<typeof ReadUsersOrdersSchema>;
