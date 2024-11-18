import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'

export class ReadPreferenceRelationsSchemaRelations {media?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
brandProfile?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelationsSchemaRelations | boolean | null | undefined}

export const ReadPreferenceRelationsSchema: v.GenericSchema<ReadPreferenceRelationsSchemaRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
brandProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)]))})



export type TReadPreferenceRelationsSchemaOutput = v.InferOutput<typeof ReadPreferenceRelationsSchema>;
export type TReadPreferenceRelationsSchemaInput = v.InferInput<typeof ReadPreferenceRelationsSchema>;
