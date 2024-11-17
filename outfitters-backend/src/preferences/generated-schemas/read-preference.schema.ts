import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from '../../users/generated-schemas/read-brand-profile.schema'
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from '../../users/generated-schemas/read-shopper-profile.schema'

export class ReadPreferenceSchemaFilters {media?: ReadMediaSchemaFilters | null | undefined;
name?: GenericComparable<"string"> | null | undefined;
brandProfile?: ReadBrandProfileSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileSchemaFilters | null | undefined;
mediaId?: GenericComparable<"number"> | null | undefined}

export const ReadPreferenceSchema: v.GenericSchema<ReadPreferenceSchemaFilters> = v.object({media: v.nullish(v.lazy(() => ReadMediaSchema)),
name: v.nullish(comparable("string")),
brandProfile: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
mediaId: v.nullish(comparable("number"))})



export type TReadPreferenceSchema = v.InferOutput<typeof ReadPreferenceSchema>
export type TReadPreferenceSchemaInput = v.InferInput<typeof ReadPreferenceSchema>
