import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from '../../users/generated-schemas/read-brand-profile.schema'

export class ReadCountrySchemaFilters {name?: GenericComparable<"string"> | null | undefined;
code?: GenericComparable<"string"> | null | undefined;
dialCode?: GenericComparable<"string"> | null | undefined;
isSupported?: GenericComparable<"bool"> | null | undefined;
icon?: ReadMediaSchemaFilters | null | undefined;
brands?: ReadBrandProfileSchemaFilters | null | undefined;
iconId?: GenericComparable<"number"> | null | undefined}

export const ReadCountrySchema: v.GenericSchema<ReadCountrySchemaFilters> = v.object({name: v.nullish(comparable("string")),
code: v.nullish(comparable("string")),
dialCode: v.nullish(comparable("string")),
isSupported: v.nullish(comparable("bool")),
icon: v.nullish(v.lazy(() => ReadMediaSchema)),
brands: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
iconId: v.nullish(comparable("number"))})



export type TReadCountrySchema = v.InferOutput<typeof ReadCountrySchema>
export type TReadCountrySchemaInput = v.InferInput<typeof ReadCountrySchema>
