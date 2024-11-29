import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadMediaRelationsSchema, { ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import ReadBrandProfileRelationsSchema, { ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import ReadShopperProfileRelationsSchema, { ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'



export class ReadPreferenceRelations {media?: ReadMediaRelations | string | boolean | undefined;
brandProfile?: ReadBrandProfileRelations | string | boolean | undefined;
shopperProfile?: ReadShopperProfileRelations | string | boolean | undefined}

const ReadPreferenceRelationsSchema: v.GenericSchema<ReadPreferenceRelations> = v.object({media: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
brandProfile: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
shopperProfile: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadShopperProfileRelationsSchema)]))});

export default ReadPreferenceRelationsSchema;




export type TReadPreferenceRelationsSchemaOutput = v.InferOutput<typeof ReadPreferenceRelationsSchema>;
export type TReadPreferenceRelationsSchemaInput = v.InferInput<typeof ReadPreferenceRelationsSchema>;
