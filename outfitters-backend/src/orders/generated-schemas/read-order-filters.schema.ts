import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderPaymentMethod } from '../entities/order.entity';
import { OrderPaymentStatusEnum } from '../entities/order.entity';
import ReadCartFiltersSchema, { ReadCartFiltersSchemaFilters } from '../../carts/generated-schemas/read-cart-filters.schema'
import ReadBrandOrderFiltersSchema, { ReadBrandOrderFiltersSchemaFilters } from './read-brand-order-filters.schema'
import ReadShippingAddressFiltersSchema, { ReadShippingAddressFiltersSchemaFilters } from '../../users/generated-schemas/read-shipping-address-filters.schema'
import ReadShopperProfileFiltersSchema, { ReadShopperProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-shopper-profile-filters.schema'



export class ReadOrderFiltersSchemaFilters {paymentMethod?: OrderPaymentMethod | null;
paymentStatus?: OrderPaymentStatusEnum | null;
totalSalePrice?: GenericComparable<"number"> | null;
totalPurchasePrice?: GenericComparable<"number"> | null;
totalShippingFees?: GenericComparable<"number"> | null;
cart?: ReadCartFiltersSchemaFilters | null;
brandOrders?: ReadBrandOrderFiltersSchemaFilters | null;
shippingAddress?: ReadShippingAddressFiltersSchemaFilters | null;
shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null;
cartId?: GenericComparable<"number"> | null;
shippingAddressId?: GenericComparable<"number"> | null;
shopperId?: GenericComparable<"number"> | null}

const ReadOrderFiltersSchema: v.GenericSchema<ReadOrderFiltersSchemaFilters> = v.object({paymentMethod: v.nullish(v.enum(OrderPaymentMethod)),
paymentStatus: v.nullish(v.enum(OrderPaymentStatusEnum)),
totalSalePrice: v.nullish(comparable("number")),
totalPurchasePrice: v.nullish(comparable("number")),
totalShippingFees: v.nullish(comparable("number")),
cart: v.nullish(v.lazy(() => ReadCartFiltersSchema)),
brandOrders: v.nullish(v.lazy(() => ReadBrandOrderFiltersSchema)),
shippingAddress: v.nullish(v.lazy(() => ReadShippingAddressFiltersSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
cartId: v.nullish(comparable("number")),
shippingAddressId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number"))});

export default ReadOrderFiltersSchema;




export type TReadOrderFiltersSchemaOutput = v.InferOutput<typeof ReadOrderFiltersSchema>;
export type TReadOrderFiltersSchemaInput = v.InferInput<typeof ReadOrderFiltersSchema>;
