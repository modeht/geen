import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadOrderRelationsSchema, { ReadOrderRelations } from '../../orders/generated-schemas/read-order-relations.schema'
import ReadShopperProfileRelationsSchema, { ReadShopperProfileRelations } from './read-shopper-profile-relations.schema'



export class ReadShippingAddressRelations {orders?: ReadOrderRelations | string | boolean | undefined;
shopperProfile?: ReadShopperProfileRelations | string | boolean | undefined}

const ReadShippingAddressRelationsSchema: v.GenericSchema<ReadShippingAddressRelations> = v.object({orders: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadOrderRelationsSchema)])),
shopperProfile: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadShopperProfileRelationsSchema)]))});

export default ReadShippingAddressRelationsSchema;




export type TReadShippingAddressRelationsSchemaOutput = v.InferOutput<typeof ReadShippingAddressRelationsSchema>;
export type TReadShippingAddressRelationsSchemaInput = v.InferInput<typeof ReadShippingAddressRelationsSchema>;
