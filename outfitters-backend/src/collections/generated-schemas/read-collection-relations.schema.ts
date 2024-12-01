import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadMediaRelationsSchema, { ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import ReadBrandProfileRelationsSchema, { ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import ReadProductRelationsSchema, { ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'



export class ReadCollectionRelations {cover?: ReadMediaRelations | string | boolean;
brand?: ReadBrandProfileRelations | string | boolean;
products?: ReadProductRelations | string | boolean}

const ReadCollectionRelationsSchema: v.GenericSchema<ReadCollectionRelations> = v.object({cover: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
brand: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
products: v.optional(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)]))});

export default ReadCollectionRelationsSchema;




export type TReadCollectionRelationsSchemaOutput = v.InferOutput<typeof ReadCollectionRelationsSchema>;
export type TReadCollectionRelationsSchemaInput = v.InferInput<typeof ReadCollectionRelationsSchema>;
