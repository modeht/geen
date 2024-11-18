import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'



export class ReadPreferenceRelations {media?: ReadMediaRelations | boolean | null | undefined;
brandProfile?: ReadBrandProfileRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelations | boolean | null | undefined}

export const ReadPreferenceRelationsSchema: v.GenericSchema<ReadPreferenceRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
brandProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)]))})



export type TReadPreferenceRelationsSchemaOutput = v.InferOutput<typeof ReadPreferenceRelationsSchema>;
export type TReadPreferenceRelationsSchemaInput = v.InferInput<typeof ReadPreferenceRelationsSchema>;
