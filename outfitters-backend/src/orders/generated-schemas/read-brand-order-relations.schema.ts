import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import { ReadOrderItemRelationsSchema, ReadOrderItemRelationsSchemaRelations } from './read-order-item-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadOrderRelationsSchema, ReadOrderRelationsSchemaRelations } from './read-order-relations.schema'

export class ReadBrandOrderRelationsSchemaRelations {items?: ReadOrderItemRelationsSchemaRelations | boolean | null | undefined;
brand?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
order?: ReadOrderRelationsSchemaRelations | boolean | null | undefined}

export const ReadBrandOrderRelationsSchema: v.GenericSchema<ReadBrandOrderRelationsSchemaRelations> = v.object({items: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderItemRelationsSchema)])),
brand: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
order: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderRelationsSchema)]))})



export type TReadBrandOrderRelationsSchemaOutput = v.InferOutput<typeof ReadBrandOrderRelationsSchema>;
export type TReadBrandOrderRelationsSchemaInput = v.InferInput<typeof ReadBrandOrderRelationsSchema>;
