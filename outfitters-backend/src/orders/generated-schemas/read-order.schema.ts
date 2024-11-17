import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderPaymentMethod } from '../entities/order.entity';
import { OrderPaymentStatusEnum } from '../entities/order.entity';
import { ReadCartSchema, ReadCartSchemaFilters } from '../../carts/generated-schemas/read-cart.schema'
import { ReadBrandOrderSchema, ReadBrandOrderSchemaFilters } from './read-brand-order.schema'
import { ReadShippingAddressSchema, ReadShippingAddressSchemaFilters } from '../../users/generated-schemas/read-shipping-address.schema'
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from '../../users/generated-schemas/read-shopper-profile.schema'

export class ReadOrderSchemaFilters {totalSalePrice?: GenericComparable<"number"> | null | undefined;
totalPurchasePrice?: GenericComparable<"number"> | null | undefined;
totalShippingFees?: GenericComparable<"number"> | null | undefined;
cart?: ReadCartSchemaFilters | null | undefined;
brandOrders?: ReadBrandOrderSchemaFilters | null | undefined;
shippingAddress?: ReadShippingAddressSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileSchemaFilters | null | undefined;
cartId?: GenericComparable<"number"> | null | undefined;
shippingAddressId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined}

export const ReadOrderSchema: v.GenericSchema<ReadOrderSchemaFilters> = v.object({totalSalePrice: v.nullish(comparable("number")),
totalPurchasePrice: v.nullish(comparable("number")),
totalShippingFees: v.nullish(comparable("number")),
cart: v.nullish(v.lazy(() => ReadCartSchema)),
brandOrders: v.nullish(v.lazy(() => ReadBrandOrderSchema)),
shippingAddress: v.nullish(v.lazy(() => ReadShippingAddressSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
cartId: v.nullish(comparable("number")),
shippingAddressId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number"))})



export type TReadOrderSchema = v.InferOutput<typeof ReadOrderSchema>
export type TReadOrderSchemaInput = v.InferInput<typeof ReadOrderSchema>
