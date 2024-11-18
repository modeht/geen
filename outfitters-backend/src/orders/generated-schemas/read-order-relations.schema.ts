import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderPaymentMethod } from '../entities/order.entity';
import { OrderPaymentStatusEnum } from '../entities/order.entity';
import { ReadCartRelationsSchema, ReadCartRelations } from '../../carts/generated-schemas/read-cart-relations.schema'
import { ReadBrandOrderRelationsSchema, ReadBrandOrderRelations } from './read-brand-order-relations.schema'
import { ReadShippingAddressRelationsSchema, ReadShippingAddressRelations } from '../../users/generated-schemas/read-shipping-address-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'



export class ReadOrderRelations {paymentMethod?: OrderPaymentMethod | null | undefined;
paymentStatus?: OrderPaymentStatusEnum | null | undefined;
cart?: ReadCartRelations | boolean | null | undefined;
brandOrders?: ReadBrandOrderRelations | boolean | null | undefined;
shippingAddress?: ReadShippingAddressRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelations | boolean | null | undefined}

export const ReadOrderRelationsSchema: v.GenericSchema<ReadOrderRelations> = v.object({paymentMethod: v.nullish(v.enum(OrderPaymentMethod)),
paymentStatus: v.nullish(v.enum(OrderPaymentStatusEnum)),
cart: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartRelationsSchema)])),
brandOrders: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandOrderRelationsSchema)])),
shippingAddress: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShippingAddressRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)]))})



export type TReadOrderRelationsSchemaOutput = v.InferOutput<typeof ReadOrderRelationsSchema>;
export type TReadOrderRelationsSchemaInput = v.InferInput<typeof ReadOrderRelationsSchema>;
