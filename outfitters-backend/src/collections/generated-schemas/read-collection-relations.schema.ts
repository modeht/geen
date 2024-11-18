import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'



export class ReadCollectionRelations {cover?: ReadMediaRelations | boolean | null | undefined;
brand?: ReadBrandProfileRelations | boolean | null | undefined;
products?: ReadProductRelations | boolean | null | undefined}

export const ReadCollectionRelationsSchema: v.GenericSchema<ReadCollectionRelations> = v.object({cover: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
brand: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
products: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadCollectionRelationsSchemaOutput = v.InferOutput<typeof ReadCollectionRelationsSchema>;
export type TReadCollectionRelationsSchemaInput = v.InferInput<typeof ReadCollectionRelationsSchema>;
