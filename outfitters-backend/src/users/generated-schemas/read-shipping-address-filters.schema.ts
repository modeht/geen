import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadOrderFiltersSchema, { ReadOrderFiltersSchemaFilters } from '../../orders/generated-schemas/read-order-filters.schema'
import ReadShopperProfileFiltersSchema, { ReadShopperProfileFiltersSchemaFilters } from './read-shopper-profile-filters.schema'



export class ReadShippingAddressFiltersSchemaFilters {deletedAt?: GenericComparable<"date"> | null;
isDefault?: GenericComparable<"bool"> | null;
name?: GenericComparable<"string"> | null;
country?: GenericComparable<"string"> | null;
city?: GenericComparable<"string"> | null;
street?: GenericComparable<"string"> | null;
apartment?: GenericComparable<"string"> | null;
address?: GenericComparable<"string"> | null;
floor?: GenericComparable<"string"> | null;
building?: GenericComparable<"string"> | null;
latitude?: GenericComparable<"string"> | null;
longitude?: GenericComparable<"string"> | null;
orders?: ReadOrderFiltersSchemaFilters | null;
shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null;
shopperId?: GenericComparable<"number"> | null}

const ReadShippingAddressFiltersSchema: v.GenericSchema<ReadShippingAddressFiltersSchemaFilters> = v.object({deletedAt: v.nullish(comparable("date")),
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
orders: v.nullish(v.lazy(() => ReadOrderFiltersSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
shopperId: v.nullish(comparable("number"))});

export default ReadShippingAddressFiltersSchema;




export type TReadShippingAddressFiltersSchemaOutput = v.InferOutput<typeof ReadShippingAddressFiltersSchema>;
export type TReadShippingAddressFiltersSchemaInput = v.InferInput<typeof ReadShippingAddressFiltersSchema>;
