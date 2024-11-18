import * as v from 'valibot';
import { ReadShippingAddressFiltersSchema } from './read-shipping-address-filters.schema';
import { ReadShippingAddressRelationsSchema } from './read-shipping-address-relations.schema';
export const ReadShippingAddressSchema = v.object({
filters: v.nullish(ReadShippingAddressFiltersSchema),
relations: v.nullish(ReadShippingAddressRelationsSchema),
});
export type TReadShippingAddressSchemaInput = v.InferInput<typeof ReadShippingAddressSchema>;
export type TReadShippingAddressSchemaOutput = v.InferOutput<typeof ReadShippingAddressSchema>;
