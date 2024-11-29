import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderPaymentMethod } from '../entities/order.entity';
import { OrderPaymentStatusEnum } from '../entities/order.entity';
import ReadCartRelationsSchema, { ReadCartRelations } from '../../carts/generated-schemas/read-cart-relations.schema'
import ReadBrandOrderRelationsSchema, { ReadBrandOrderRelations } from './read-brand-order-relations.schema'
import ReadShippingAddressRelationsSchema, { ReadShippingAddressRelations } from '../../users/generated-schemas/read-shipping-address-relations.schema'
import ReadShopperProfileRelationsSchema, { ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'



export class ReadOrderRelations {paymentMethod?: OrderPaymentMethod | null | undefined;
paymentStatus?: OrderPaymentStatusEnum | null | undefined;
cart?: ReadCartRelations | string | boolean | undefined;
brandOrders?: ReadBrandOrderRelations | string | boolean | undefined;
shippingAddress?: ReadShippingAddressRelations | string | boolean | undefined;
shopperProfile?: ReadShopperProfileRelations | string | boolean | undefined}

const ReadOrderRelationsSchema: v.GenericSchema<ReadOrderRelations> = v.object({paymentMethod: v.nullish(v.enum(OrderPaymentMethod)),
paymentStatus: v.nullish(v.enum(OrderPaymentStatusEnum)),
cart: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCartRelationsSchema)])),
brandOrders: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandOrderRelationsSchema)])),
shippingAddress: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadShippingAddressRelationsSchema)])),
shopperProfile: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadShopperProfileRelationsSchema)]))});

export default ReadOrderRelationsSchema;




export type TReadOrderRelationsSchemaOutput = v.InferOutput<typeof ReadOrderRelationsSchema>;
export type TReadOrderRelationsSchemaInput = v.InferInput<typeof ReadOrderRelationsSchema>;
