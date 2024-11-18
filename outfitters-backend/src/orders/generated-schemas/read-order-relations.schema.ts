import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderPaymentMethod } from '../entities/order.entity';
import { OrderPaymentStatusEnum } from '../entities/order.entity';
import { ReadCartRelationsSchema, ReadCartRelationsSchemaRelations } from '../../carts/generated-schemas/read-cart-relations.schema'
import { ReadBrandOrderRelationsSchema, ReadBrandOrderRelationsSchemaRelations } from './read-brand-order-relations.schema'
import { ReadShippingAddressRelationsSchema, ReadShippingAddressRelationsSchemaRelations } from '../../users/generated-schemas/read-shipping-address-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'

export class ReadOrderRelationsSchemaRelations {cart?: ReadCartRelationsSchemaRelations | boolean | null | undefined;
brandOrders?: ReadBrandOrderRelationsSchemaRelations | boolean | null | undefined;
shippingAddress?: ReadShippingAddressRelationsSchemaRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelationsSchemaRelations | boolean | null | undefined}

export const ReadOrderRelationsSchema: v.GenericSchema<ReadOrderRelationsSchemaRelations> = v.object({cart: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartRelationsSchema)])),
brandOrders: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandOrderRelationsSchema)])),
shippingAddress: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShippingAddressRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)]))})



export type TReadOrderRelationsSchema = v.InferOutput<typeof ReadOrderRelationsSchema>;

export type TReadOrderRelationsSchemaInput = v.InferInput<typeof ReadOrderRelationsSchema>;
