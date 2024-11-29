import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import ReadOrderItemRelationsSchema, { ReadOrderItemRelations } from './read-order-item-relations.schema'
import ReadBrandProfileRelationsSchema, { ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import ReadOrderRelationsSchema, { ReadOrderRelations } from './read-order-relations.schema'



export class ReadBrandOrderRelations {status?: OrderStatusEnum | null | undefined;
items?: ReadOrderItemRelations | string | boolean | undefined;
brand?: ReadBrandProfileRelations | string | boolean | undefined;
order?: ReadOrderRelations | string | boolean | undefined}

const ReadBrandOrderRelationsSchema: v.GenericSchema<ReadBrandOrderRelations> = v.object({status: v.nullish(v.enum(OrderStatusEnum)),
items: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadOrderItemRelationsSchema)])),
brand: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
order: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadOrderRelationsSchema)]))});

export default ReadBrandOrderRelationsSchema;




export type TReadBrandOrderRelationsSchemaOutput = v.InferOutput<typeof ReadBrandOrderRelationsSchema>;
export type TReadBrandOrderRelationsSchemaInput = v.InferInput<typeof ReadBrandOrderRelationsSchema>;
