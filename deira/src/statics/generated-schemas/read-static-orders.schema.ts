import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';

export class ReadStaticOrders {
	whatsapp?: OrderDirectionEnum;
	email?: OrderDirectionEnum;
	phoneNumber?: OrderDirectionEnum;
	facebook?: OrderDirectionEnum;
	instagram?: OrderDirectionEnum;
	x?: OrderDirectionEnum;
}

const ReadStaticOrdersSchema: v.GenericSchema<ReadStaticOrders> = v.object({
	whatsapp: v.optional(OrderDirectionSchema),
	email: v.optional(OrderDirectionSchema),
	phoneNumber: v.optional(OrderDirectionSchema),
	facebook: v.optional(OrderDirectionSchema),
	instagram: v.optional(OrderDirectionSchema),
	x: v.optional(OrderDirectionSchema),
});

export default ReadStaticOrdersSchema;

export type TReadStaticOrdersSchemaOutput = v.InferOutput<typeof ReadStaticOrdersSchema>;
export type TReadStaticOrdersSchemaInput = v.InferInput<typeof ReadStaticOrdersSchema>;
