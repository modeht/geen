import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadOrderRelationsSchema, ReadOrderRelations } from '../../orders/generated-schemas/read-order-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from './read-shopper-profile-relations.schema'



export class ReadShippingAddressRelations {orders?: ReadOrderRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelations | boolean | null | undefined}

export const ReadShippingAddressRelationsSchema: v.GenericSchema<ReadShippingAddressRelations> = v.object({orders: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)]))})



export type TReadShippingAddressRelationsSchemaOutput = v.InferOutput<typeof ReadShippingAddressRelationsSchema>;
export type TReadShippingAddressRelationsSchemaInput = v.InferInput<typeof ReadShippingAddressRelationsSchema>;
