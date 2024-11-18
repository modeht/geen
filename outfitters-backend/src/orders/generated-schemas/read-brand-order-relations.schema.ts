import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import { ReadOrderItemRelationsSchema, ReadOrderItemRelations } from './read-order-item-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadOrderRelationsSchema, ReadOrderRelations } from './read-order-relations.schema'



export class ReadBrandOrderRelations {status?: OrderStatusEnum | null | undefined;
items?: ReadOrderItemRelations | boolean | null | undefined;
brand?: ReadBrandProfileRelations | boolean | null | undefined;
order?: ReadOrderRelations | boolean | null | undefined}

export const ReadBrandOrderRelationsSchema: v.GenericSchema<ReadBrandOrderRelations> = v.object({status: v.nullish(v.enum(OrderStatusEnum)),
items: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderItemRelationsSchema)])),
brand: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
order: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderRelationsSchema)]))})



export type TReadBrandOrderRelationsSchemaOutput = v.InferOutput<typeof ReadBrandOrderRelationsSchema>;
export type TReadBrandOrderRelationsSchemaInput = v.InferInput<typeof ReadBrandOrderRelationsSchema>;
