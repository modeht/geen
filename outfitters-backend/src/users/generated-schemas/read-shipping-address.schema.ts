import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadOrderSchema, ReadOrderSchemaFilters } from '../../orders/generated-schemas/read-order.schema'
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from './read-shopper-profile.schema'

export class ReadShippingAddressSchemaFilters {deletedAt?: GenericComparable<"date"> | null | undefined;
isDefault?: GenericComparable<"bool"> | null | undefined;
name?: GenericComparable<"string"> | null | undefined;
country?: GenericComparable<"string"> | null | undefined;
city?: GenericComparable<"string"> | null | undefined;
street?: GenericComparable<"string"> | null | undefined;
apartment?: GenericComparable<"string"> | null | undefined;
address?: GenericComparable<"string"> | null | undefined;
floor?: GenericComparable<"string"> | null | undefined;
building?: GenericComparable<"string"> | null | undefined;
latitude?: GenericComparable<"string"> | null | undefined;
longitude?: GenericComparable<"string"> | null | undefined;
orders?: ReadOrderSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileSchemaFilters | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined}

export const ReadShippingAddressSchema: v.GenericSchema<ReadShippingAddressSchemaFilters> = v.object({deletedAt: v.nullish(comparable("date")),
isDefault: v.nullish(comparable("bool")),
name: v.nullish(comparable("string")),
country: v.nullish(comparable("string")),
city: v.nullish(comparable("string")),
street: v.nullish(comparable("string")),
apartment: v.nullish(comparable("string")),
address: v.nullish(comparable("string")),
floor: v.nullish(comparable("string")),
building: v.nullish(comparable("string")),
latitude: v.nullish(comparable("string")),
longitude: v.nullish(comparable("string")),
orders: v.nullish(v.lazy(() => ReadOrderSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
shopperId: v.nullish(comparable("number"))})



export type TReadShippingAddressSchema = v.InferOutput<typeof ReadShippingAddressSchema>
export type TReadShippingAddressSchemaInput = v.InferInput<typeof ReadShippingAddressSchema>
