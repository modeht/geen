import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadOrderRelationsSchema, ReadOrderRelationsSchemaRelations } from '../../orders/generated-schemas/read-order-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelationsSchemaRelations } from './read-shopper-profile-relations.schema'

export class ReadShippingAddressRelationsSchemaRelations {orders?: ReadOrderRelationsSchemaRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelationsSchemaRelations | boolean | null | undefined}

export const ReadShippingAddressRelationsSchema: v.GenericSchema<ReadShippingAddressRelationsSchemaRelations> = v.object({orders: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)]))})



export type TReadShippingAddressRelationsSchema = v.InferOutput<typeof ReadShippingAddressRelationsSchema>;

export type TReadShippingAddressRelationsSchemaInput = v.InferInput<typeof ReadShippingAddressRelationsSchema>;
