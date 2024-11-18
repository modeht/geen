import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'

export class ReadCountryRelationsSchemaRelations {icon?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
brands?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined}

export const ReadCountryRelationsSchema: v.GenericSchema<ReadCountryRelationsSchemaRelations> = v.object({icon: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
brands: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)]))})



export type TReadCountryRelationsSchema = v.InferOutput<typeof ReadCountryRelationsSchema>;

export type TReadCountryRelationsSchemaInput = v.InferInput<typeof ReadCountryRelationsSchema>;
