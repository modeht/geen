import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import ReadOrderItemRelationsSchema, { ReadOrderItemRelations } from './read-order-item-relations.schema'
import ReadBrandProfileRelationsSchema, { ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import ReadOrderRelationsSchema, { ReadOrderRelations } from './read-order-relations.schema'



export class ReadBrandOrderRelations {status?: OrderStatusEnum | null;
items?: ReadOrderItemRelations | string | boolean;
brand?: ReadBrandProfileRelations | string | boolean;
order?: ReadOrderRelations | string | boolean}

const ReadBrandOrderRelationsSchema: v.GenericSchema<ReadBrandOrderRelations> = v.object({status: v.nullish(v.enum(OrderStatusEnum)),
items: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadOrderItemRelationsSchema)])),
brand: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
order: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadOrderRelationsSchema)]))});

export default ReadBrandOrderRelationsSchema;




export type TReadBrandOrderRelationsSchemaOutput = v.InferOutput<typeof ReadBrandOrderRelationsSchema>;
export type TReadBrandOrderRelationsSchemaInput = v.InferInput<typeof ReadBrandOrderRelationsSchema>;
